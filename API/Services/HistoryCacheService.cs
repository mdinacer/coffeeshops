using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using API.Data;
using API.DTO;
using API.Models;
using Microsoft.OpenApi.Extensions;
using StackExchange.Redis;

namespace API.Services
{
    public class HistoryCacheService
    {
        private readonly IDatabase _database;
        public HistoryCacheService(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<bool> ClearHistoryAsync(string shopId)
        {
            var key = $"history_{shopId}";
            return await _database.KeyDeleteAsync(key);
        }

        public async Task<List<HistoryElementDto>?> GetHistoryAsync(string shopId)
        {
            var key = $"history_{shopId}";
            var data = await _database.StringGetAsync(key);

            return data.IsNullOrEmpty ? new() : JsonSerializer.Deserialize<List<HistoryElementDto>>(data!);
        }

        public async Task<bool> DeleteHistoryElementAsync(string shopId, string elementId)
        {

            var elements = await GetHistoryAsync(shopId);
            if (elements == null) return false;
            var element = elements.SingleOrDefault(e => e.Id == elementId);
            if (element != null)
            {
                var key = $"history_{shopId}";
                elements.Remove(element);
                var created = await _database.StringSetAsync(key, JsonSerializer.Serialize(elements),
                TimeSpan.FromDays(90));

                if (created) return true;
            }
            return false;
        }

        public async Task<List<HistoryElementDto>?> UpdateHistoryAsync(string shopId, HistoryElementDto element)
        {
            var key = $"history_{shopId}";
            var elements = await GetHistoryAsync(shopId);
            if (elements == null)
                elements = new List<HistoryElementDto>();

            elements.Add(element);


            var created = await _database.StringSetAsync(key, JsonSerializer.Serialize(elements),
                TimeSpan.FromDays(90));

            if (!created) return null;

            return await GetHistoryAsync(shopId);
        }


        public async Task CreateHistoryElement(HttpContext httpContext, User user, string shopId, object entity)
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


            if (user == null) return;
            var action = httpContext.Request.Method switch
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

            await UpdateHistoryAsync(shopId, element);
        }


    }
}