using System.Text.Json;
using API.DTO;
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

    }
}