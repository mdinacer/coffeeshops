using API.Data;
using API.DTO;
using API.Extensions;
using API.Helpers;
using API.interfaces;
using API.Models;
using API.Models.Notifications;
using API.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize(Policy = "IsShopMember")]
public class OperationsController : BaseApiController
{
    private readonly DataContext _context;
    private readonly HistoryCacheService _history;
    private readonly IMapper _mapper;
    private readonly INotificationSink _notificationSink;
    private readonly IUserProvider _userProvider;

    public OperationsController(DataContext context, IMapper mapper, HistoryCacheService history, INotificationSink notificationSink, IUserProvider userProvider)
    {
        _userProvider = userProvider;
        _notificationSink = notificationSink;
        _history = history;
        _mapper = mapper;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<OperationDto>>> GetOperations([FromQuery] OperationParams operationParams)
    {
        var query = _context.Operations
            .Where(p => p.ShopId == ShopId)
            .Sort(operationParams.OrderBy)
            .Filter(operationParams.Type, operationParams.StartDate, operationParams.EndDate, operationParams.AgentId)
            .ProjectTo<OperationDto>(_mapper.ConfigurationProvider)
            .AsQueryable();

        var operations =
            await PagedList<OperationDto>.CreateAsync(query, operationParams.PageNumber, operationParams.PageSize);

        Response.AddPaginationHeader(operations.MetaData);

        return operations;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OperationDto>> GetOperation(string id)
    {
        var operation = await _context.Operations
            .Include(o => o.Elements)
            .SingleOrDefaultAsync(o => o.Id == id && o.ShopId == ShopId);

        if (operation == null) return NotFound("Operation Not found");

        return Ok(_mapper.Map<OperationDto>(operation));
    }

    [Authorize(Policy = "IsShopMember")]
    [HttpPost]
    public async Task<ActionResult<OperationDto>> CreateOperation(CreateOperationDto createOperation)
    {
        var username = User.Identity?.Name;

        var user = await _context.Users
            .SingleOrDefaultAsync(u => u.UserName == username);

        if (user == null) return NotFound("User Not found");

        var shop = await _context.Shops.FindAsync(ShopId);

        if (string.IsNullOrEmpty(ShopId) || shop == null) return BadRequest("Shop not found");

        var operation = new Operation
        {
            ShopId = shop.Id,
            Date = DateTime.UtcNow,
            Table = createOperation.Table,
            Type = createOperation.Type,
            Paid = createOperation.Paid ?? 0
        };

        foreach (var element in createOperation.Elements)
        {
            var product = await _context.Products
                .Include(p => p.Batches)
                .SingleOrDefaultAsync(p => p.Id == element.ProductId);

            if (product != null)
            {
                var operationElement = new OperationElement
                {
                    ProductId = product.Id,
                    ProductName = product.Name,
                    Quantity = element.Quantity,
                    Price = element.Price
                };
                operation.Elements.Add(operationElement);


                if (createOperation.Type == ShopOperationType.purchase)
                {
                    product.Quantity += element.Quantity;
                }
                else
                {
                    product.SoldQuantity += element.Quantity;
                    if (product.MinQuantity > 0 && product.GetInventory() < +product.MinQuantity)
                    {
                        await _notificationSink.PushAsync(new Notification
                        {
                            ShopId = ShopId,
                            EntityId = product.Id,
                            Nature = "productLowStock",
                            Payload = new
                            {
                                Name = product.Name,
                                Stock = product.GetInventory()
                            }
                        });
                    }

                }


                if (createOperation.Type == ShopOperationType.purchase)
                {
                    var batch = new ProductBatch
                    {
                        ShopId = operation.ShopId,
                        Date = operation.Date,
                        ProductId = product.Id,
                        ExpiryDate = element.ExpiryDate,
                        Quantity = element.Quantity,
                        Active = !product.Batches.Any(b => b.Active),
                        Price = element.Price,
                        Profit = product.Price - element.Price
                    };
                    product.Batches.Add(batch);
                }
                else if (createOperation.Type == ShopOperationType.sale)
                {
                    var quantity = element.Quantity;
                    var batches = product.Batches
                        .Where(b => !b.SoldOut && !b.GetExpired())
                        .OrderBy(b => b.Date).ToList();

                    if (quantity > 0)
                        batches.ForEach(batch =>
                        {
                            var remain = batch.GetRemain();

                            if (quantity <= remain)
                            {
                                batch.SoldQuantity += quantity;
                                batch.Active = true;
                                batch.SoldOut = false;
                                quantity = 0;
                            }

                            if (quantity <= remain) return;
                            batch.SoldQuantity += remain;
                            batch.SoldOut = true;
                            batch.Active = false;
                            quantity -= remain;
                        });
                }
            }
        }

        operation.Total = createOperation.Elements.Sum(e => e.Price * e.Quantity);
        operation.Paid = createOperation.Paid ?? operation.Total;


        if (!string.IsNullOrEmpty(createOperation.AgentId))
        {
            var agentType = createOperation.Type == ShopOperationType.purchase ? AgentType.provider : AgentType.client;
            var agent = await _context.Agents.SingleOrDefaultAsync(a =>
                a.Id == createOperation.AgentId && a.Type == agentType);

            if (agent != null)
            {
                operation.AgentId = agent.Id;
                operation.AgentName = agent.Name;

                agent.Total += operation.Total;
                agent.Paid += operation.Paid;

                // var type = agent.Type == AgentType.client ? "Client" : "Fournisseur";
            }
        }


        if (createOperation.Paid > 0)
        {
            var direction = createOperation.Type == ShopOperationType.sale
                ? TransactionDirection.incoming
                : TransactionDirection.outgoing;

            var operationType = createOperation.Type == ShopOperationType.sale ? "Vente" : "Achat";

            var payment = new MoneyTransaction
            {
                Id = Guid.NewGuid().ToString(),
                Date = DateTime.UtcNow,
                ShopId = ShopId,
                UserId = user.Id,
                Type = TransactionType.transaction,
                Direction = direction,
                Amount = createOperation.Paid ?? 0,
                Description = operationType
            };
            _context.Transactions.Add(payment);
        }


        _context.Operations.Add(operation);


        var success = await _context.SaveChangesAsync() > 0;

        if (success)
        {
            CreateOperationHistoryElement(operation);
            var operationDto = _mapper.Map<OperationDto>(operation);
            //await _hub.Clients.Group(ShopId!).SendAsync("ReceiveMessage", operationDto);
            return Ok(operationDto);
        }

        return BadRequest(new ProblemDetails { Title = "Error creating operation" });
    }


    [Authorize(Policy = "IsShopOwner")]
    [HttpDelete("{id}")]
    public async Task<ActionResult<OperationDto>> EditOperation(string id)
    {
        var user = await UserAccessor.GetUser(HttpContext, _context);

        if (user == null || string.IsNullOrEmpty(ShopId)) return BadRequest("Must be authenticated");
        var operation = await _context.Operations.SingleOrDefaultAsync(o => o.Id == id && o.ShopId == ShopId);

        if (operation == null) return BadRequest("Operation not found");

        _context.Operations.Remove(operation);

        var success = await _context.SaveChangesAsync() > 0;

        if (success)
        {
            CreateOperationHistoryElement(operation);
            return Ok(true);
        }

        return BadRequest(new ProblemDetails { Title = "Error Deleting operation" });
    }

    private async void CreateOperationHistoryElement(Operation operation)
    {
        var userId = _userProvider.GetUserId();
        var userName = _userProvider.GetUserName();
        if (string.IsNullOrEmpty(ShopId) || string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(userName)) return;
        await _history.CreateHistoryElement(HttpContext.Request.Method, userId, userName, ShopId, operation);
    }
}