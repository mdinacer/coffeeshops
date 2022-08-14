namespace API.Models
{
    public class Agent
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Mobile { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public decimal Total { get; set; }
        public decimal Paid { get; set; }

        public AgentType Type { get; set; }
        public List<Operation> Operations { get; set; } = new();
        public List<MoneyTransaction> Payments { get; set; } = new();

        public string ShopId { get; set; }
        public Shop Shop { get; set; }



        public decimal GetDebt()
        {
            return Total > Paid ? Total - Paid : 0;
        }
    }
}