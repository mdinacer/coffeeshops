namespace API.DTO
{
    public class CreateProductDto
    {
        //public string ShopId { get; set; }
        public string Name { get; set; }
        public string CategoryId { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public decimal? PurchasePrice { get; set; }
        public int Quantity { get; set; }
        public int MinQuantity { get; set; }
        public IFormFile? File { get; set; }
        public string? PictureUrl { get; set; }
        public bool Showcase { get; set; }
        public bool UseInventory { get; set; }
        public DateTime? ExpiryDate { get; set; }


    }
}