using System.Text.Json;
using API.DTO;
using API.Models;
using StackExchange.Redis;

namespace API.Services
{
    public class RedisService
    {
        private readonly IDatabase _database;
        public RedisService(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<bool> DeleteOrderAsync(string orderId)
        {
            return await _database.KeyDeleteAsync(orderId);
        }

        public async Task<List<CacheShopOrder>?> GetOrdersAsync(string shopId)
        {
            var data = await _database.StringGetAsync(shopId);

            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<List<CacheShopOrder>>(data!);
        }

        public async Task<List<CacheShopOrder>?> UpdateOrderAsync(string shopId, ShopOrdersDto shopOrders)
        {
            var created = await _database.StringSetAsync(shopId, JsonSerializer.Serialize(shopOrders.Orders),
                TimeSpan.FromDays(1));

            if (!created) return null;

            return await GetOrdersAsync(shopId);
        }
    }
}