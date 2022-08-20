namespace API.Models
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public string? PublicId { get; set; }
        public string PictureUrl { get; set; }
        public bool Validated { get; set; } = false;
        //public List<Product> Products { get; set; } = new();
    }
}