using System.Text.Json;
using API.DTO;
using StackExchange.Redis;

namespace API.Services;

public class RedisService
{
    private readonly IDatabase _database;

    public RedisService(IConnectionMultiplexer redis)
    {
        _database = redis.GetDatabase();
    }

    public async Task<bool> ClearOrdersAsync(string shopId)
    {
        return await _database.KeyDeleteAsync(shopId);
    }


    public async Task<List<CacheShopOrder>?> GetOrdersAsync(string shopId)
    {
        var data = await _database.StringGetAsync(shopId);

        return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<List<CacheShopOrder>>(data!.ToString());
    }

    public async Task<List<CacheShopOrder>?> UpdateOrderAsync(string shopId, ShopOrdersDto shopOrders)
    {
        if (shopOrders.Orders.Any(o => o.Elements.Count > 0))
        {
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            var created = await _database.StringSetAsync(shopId, JsonSerializer.Serialize(shopOrders.Orders),
                TimeSpan.FromDays(1));

            if (!created) return null;

            return await GetOrdersAsync(shopId);
        }

        await ClearOrdersAsync(shopId);
        return new List<CacheShopOrder>();
    }
}