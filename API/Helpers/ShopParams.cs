namespace API.Helpers
{
    public class ShopParams : PaginationParams
    {
        public string OrderBy { get; set; } = "name";
        public string? SearchTerm { get; set; }
    }
}