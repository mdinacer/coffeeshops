namespace API.Models
{
    public class Operation : ShopEntity
    {
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public decimal Total { get; set; }
        public decimal Paid { get; set; }

        public string? AgentId { get; set; }
        public string? AgentName { get; set; }
        public Agent? Agent { get; set; }
        public int? Table { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public ShopOperationType Type { get; set; }
        public List<OperationElement> Elements { get; set; } = new();

        public decimal GetRemain()
        {
            return Total > Paid ? Total - Paid : 0;
        }

    }
}