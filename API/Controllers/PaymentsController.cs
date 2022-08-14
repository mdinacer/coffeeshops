using API.Data;
using API.DTO;
using API.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class PaymentsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PaymentsController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [Authorize(Policy = "IsShopMember")]
        [HttpGet("{id}")]
        public async Task<ActionResult<List<PaymentDto>>> GetPayments(string id)
        {
            var payments = await _context.Transactions
            .Where(payment => payment.ShopId == ShopId && payment.AgentId == id)
            .ProjectTo<PaymentDto>(_mapper.ConfigurationProvider)
            .ToListAsync();



            return payments;
        }


        [Authorize(Policy = "IsShopModerator")]
        [HttpPost]
        public async Task<ActionResult<PaymentDto>> CreatePayment([FromForm] CreatePaymentDto createPayment)
        {
            if (ShopId == null) return BadRequest(new ProblemDetails { Title = "You must be a member" });

            var username = User.Identity?.Name;

            var user = await _context.Users
           .SingleOrDefaultAsync(u => u.UserName == username);

            if (user == null) return NotFound("User Not found");

            var agent = await _context.Agents.SingleOrDefaultAsync(a => a.ShopId == ShopId && a.Id == createPayment.AgentId);

            if (agent == null || agent.GetDebt() <= 0) return NotFound("Agent not found or doesn't have debts.");

            var operations = await _context.Operations
            .Where(o => o.ShopId == ShopId && o.AgentId == agent.Id && o.Paid < o.Total)
            .ToListAsync();

            var direction = agent.Type == AgentType.client
                ? TransactionDirection.incoming
                : TransactionDirection.outgoing;

            var payment = new MoneyTransaction
            {
                Id = Guid.NewGuid().ToString(),
                Date = DateTime.UtcNow,
                ShopId = ShopId,
                UserId = user.Id,
                Type = TransactionType.payment,
                Direction = direction,
            };


            _mapper.Map<CreatePaymentDto, MoneyTransaction>(createPayment, payment);

            if (operations.Any())
            {
                var amount = createPayment.Amount;

                operations.ForEach(operation =>
                        {
                            if (amount > 0)
                            {
                                amount = SetPayment(operation, amount);
                            }
                        });
            }

            agent.Paid += createPayment.Amount;

            _context.Transactions.Add(payment);

            var success = await _context.SaveChangesAsync() > 0;

            return success
            ? Ok(_mapper.Map<PaymentDto>(payment))
            : BadRequest(new ProblemDetails { Title = "Error creating payment" });
        }

        [Authorize(Policy = "IsShopModerator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(string id)
        {
            var payment = await _context.Transactions
            .Include(p => p.Agent)
            .SingleOrDefaultAsync(p => p.ShopId == ShopId && p.Id == id);

            if (payment == null) return NotFound("Payment not found.");

            if (payment.Agent != null)
            {
                payment.Agent.Paid -= payment.Amount;
                var operationType = payment.Agent.Type == AgentType.client
                    ? ShopOperationType.sale
                    : ShopOperationType.purchase;

                var operation = new Operation
                {
                    Date = payment.Date,
                    Total = payment.Amount,
                    Paid = 0,
                    Elements = new(),
                    AgentId = payment.AgentId,
                    AgentName = payment.Agent.Name,
                    Type = operationType,
                };
                _context.Operations.Add(operation);
            }

            _context.Transactions.Remove(payment);


            var success = await _context.SaveChangesAsync() > 0;

            return success
            ? Ok(true)
            : BadRequest(new ProblemDetails { Title = "Error deleting payment" });
        }

        private decimal SetPayment(Operation operation, decimal amount)
        {
            var remain = operation.Total - operation.Paid;
            if (amount > remain)
            {
                operation.Paid = operation.Total;
                return amount - remain;
            }
            else
            {
                operation.Paid += amount;
                return 0;
            }
        }
    }
}