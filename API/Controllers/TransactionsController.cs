using API.Data;
using API.DTO;
using API.Extensions;
using API.Helpers;
using API.Models;
using API.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class TransactionsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly HistoryCacheService _history;
        public TransactionsController(DataContext context, IMapper mapper, HistoryCacheService history)
        {
            _history = history;
            _mapper = mapper;
            _context = context;

        }
        [HttpGet]
        public async Task<ActionResult<PagedList<TransactionDto>>> GetTransactions([FromQuery] TransactionsParams transactionParams)
        {
            var query = _context.Transactions
            .Where(p => p.ShopId == ShopId)
            .Filter(transactionParams.Type, transactionParams.Direction, transactionParams.StartDate, transactionParams.EndDate)
            .Sort(transactionParams.OrderBy)
            .ProjectTo<TransactionDto>(_mapper.ConfigurationProvider)
            .AsQueryable();

            var transactions =
               await PagedList<TransactionDto>.ToPagedListAsync(query, transactionParams.PageNumber, transactionParams.PageSize);

            return transactions;
        }

        [Authorize(Policy = "IsShopModerator")]
        [HttpPost]
        public async Task<ActionResult<TransactionDto>> CreatePayment(CreateTransactionDto createTransaction)
        {
            if (string.IsNullOrEmpty(ShopId))
                return BadRequest(new ProblemDetails { Title = "You must be a member" });

            var username = User.Identity?.Name;

            var user = await _context.Users
           .SingleOrDefaultAsync(u => u.UserName == username);

            if (user == null) return NotFound("User Not found");

            var transaction = new MoneyTransaction
            {
                Id = Guid.NewGuid().ToString(),
                Date = DateTime.UtcNow,
                UserId = user.Id,
                ShopId = ShopId,
                Type = TransactionType.transaction
            };

            _mapper.Map(createTransaction, transaction);

            _context.Transactions.Add(transaction);

            var success = await _context.SaveChangesAsync() > 0;

            if (success)
            {
                CreateTransactionHistoryElement(transaction);
                return Ok(_mapper.Map<TransactionDto>(transaction));
            }
            else
            {
                return BadRequest(new ProblemDetails { Title = "Error creating Transaction" });
            }


        }

        [Authorize(Policy = "IsShopModerator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(string id)
        {
            var transaction = await _context.Transactions
            .SingleOrDefaultAsync(p => p.ShopId == ShopId && p.Id == id);

            if (transaction == null) return NotFound("Payment not found.");

            _context.Transactions.Remove(transaction);


            var success = await _context.SaveChangesAsync() > 0;

            if (success)
            {
                CreateTransactionHistoryElement(transaction);
                return Ok(true);
            }
            else
            {
                return BadRequest(new ProblemDetails { Title = "Error deleting transaction" });
            }
        }

        private async void CreateTransactionHistoryElement(MoneyTransaction transaction)
        {
            if (string.IsNullOrEmpty(ShopId)) return;
            await CreateHistoryElement(_context, _history, ShopId, transaction);
        }

    }
}