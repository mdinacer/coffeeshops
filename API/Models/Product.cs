namespace API.Models
{
    public class Product : ShopEntity
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? PublicId { get; set; }
        public string PictureUrl { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int SoldQuantity { get; set; }
        public int LossQuantity { get; set; }
        public int MinQuantity { get; set; }
        public string CategoryId { get; set; }
        public Category Category { get; set; }
        public bool Showcase { get; set; }
        public bool UseInventory { get; set; }
        public List<ProductBatch> Batches { get; set; } = new();

        public int GetInventory()
        {
            return UseInventory ? Quantity - SoldQuantity : 0;
        }

        public DateTime? GetExpiryDate()
        {
            var batch = Batches.OrderBy(b => b.Date).FirstOrDefault(b => b.ExpiryDate != null && !b.SoldOut);

            return batch != null ? batch.ExpiryDate : null;
        }

        public ProductBatch? GetActiveBatch()
        {
            var batch = Batches.OrderBy(b => b.Date).FirstOrDefault(b => b.Active == true && !b.SoldOut);
            return batch;
        }

        public decimal GetCurrentProfit()
        {
            if (!Batches.Any())
                return 0;

            var profit = Batches.Sum(b => b.GetCurrentProfit());

            return profit;
        }
    }
}