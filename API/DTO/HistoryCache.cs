namespace API.DTO;

public class HistoryCache
{
    public DateTime MyProperty { get; set; }

    public List<HistoryElementDto> Elements { get; set; } = new();
}

public class HistoryElementDto
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public string UserId { get; set; }
    public string Username { get; set; }
    public ShopEntityAction Action { get; set; } = ShopEntityAction.create;
    public string ActionName { get; set; }
    public ShopEntityType EntityType { get; set; }
    public string EntityName { get; set; }
    public string EntityId { get; set; }
}