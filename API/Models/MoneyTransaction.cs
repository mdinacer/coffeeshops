namespace API.Models;

public class MoneyTransaction
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public decimal Amount { get; set; }
    public string? Description { get; set; }
    public TransactionDirection Direction { get; set; } = TransactionDirection.incoming;
    public TransactionType Type { get; set; } = TransactionType.transaction;
    public string? AgentId { get; set; }
    public Agent? Agent { get; set; }
    public string ShopId { get; set; }
    public Shop Shop { get; set; }
    public string UserId { get; set; }
    public User User { get; set; }
}