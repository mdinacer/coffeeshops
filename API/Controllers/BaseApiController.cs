using System.ComponentModel.DataAnnotations;
using API.Data;
using API.DTO;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private string? _shopId;
        protected string? ShopId => _shopId ??= GetShopHeader();


        private string? GetShopHeader()
        {
            var success = HttpContext.Request.Headers.TryGetValue("X-SHOP", out var shopHeader);

            return success ? shopHeader.ToString() : null;
        }

        protected async Task<User?> GetUser(DataContext context)
        {
            var username = User.Identity?.Name;
            var user = await context.Users
                .Include(u => u.Shop)
                .SingleOrDefaultAsync(u => u.UserName == username);

            return user;
        }

        protected async Task CreateHistoryElement(DataContext context, HistoryCacheService historyService, string shopId, object entity)
        {
            ShopEntityType elementType;
            string entityId;

            switch (entity)
            {
                case Agent agent:
                    elementType = agent.Type == AgentType.client ? ShopEntityType.client : ShopEntityType.provider;
                    entityId = agent.Id;
                    break;
                case Operation operation:
                    elementType = operation.Type == ShopOperationType.sale ? ShopEntityType.order : ShopEntityType.purchase;
                    entityId = operation.Id;
                    break;

                case MoneyTransaction transaction:
                    elementType = ShopEntityType.transaction;
                    entityId = transaction.Id;
                    break;

                case Shop shop:
                    elementType = ShopEntityType.shop;
                    entityId = shop.Id;
                    break;

                case Product product:
                    elementType = ShopEntityType.product;
                    entityId = product.Id;
                    break;

                case UserProfile profile:
                    elementType = ShopEntityType.profile;
                    entityId = profile.Id;
                    break;

                default:
                    elementType = ShopEntityType.order;
                    entityId = string.Empty;
                    break;
            }

            var user = await GetUser(context);
            if (user == null) return;
            var action = HttpContext.Request.Method switch
            {
                "POST" => ShopEntityAction.create,
                "PUT" => ShopEntityAction.update,
                "DELETE" => ShopEntityAction.delete,
                _ => ShopEntityAction.create
            };

            var element = new HistoryElementDto
            {
                Id = Guid.NewGuid().ToString(),
                Date = DateTime.UtcNow,
                UserId = user.Id,
                Username = user.UserName,
                Action = action,
                ActionName = action.GetAttributeOfType<DisplayAttribute>().Name!,
                EntityType = elementType,
                EntityName = elementType.GetAttributeOfType<DisplayAttribute>().Name!,
                EntityId = entityId
            };

            await historyService.UpdateHistoryAsync(shopId, element);
        }
    }
}