namespace API.Models
{
    public class Shop
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string OwnerId { get; set; }
        public User Owner { get; set; }
        public int TablesCount { get; set; }
        public List<Category> Categories { get; set; } = new();
        public List<Product> Products { get; set; } = new();
        public List<Operation> Operations { get; set; } = new();
        public List<MoneyTransaction> Transactions { get; set; } = new();

    }
}