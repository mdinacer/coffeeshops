namespace API.DTO
{
    public class EditProductDto
    {
        public string Name { get; set; }
        public string CategoryId { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public IFormFile? File { get; set; }
        public bool Showcase { get; set; }
        public bool UseInventory { get; set; }
    }
}