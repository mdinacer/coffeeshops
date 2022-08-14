namespace API.Helpers
{
    public class ProductsParams : PaginationParams
    {
        public string OrderBy { get; set; } = "name";
        public string? SearchTerm { get; set; }
        public string? CategoryId { get; set; }
        public bool? Showcase { get; set; }
        public bool? UseInventory { get; set; }
    }
}