namespace API.DTO;

public class ProductDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public string PublicId { get; set; }
    public string PictureUrl { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public int MinQuantity { get; set; }
    public int SoldQuantity { get; set; }
    public int Inventory { get; set; }
    public bool Showcase { get; set; }
    public bool UseInventory { get; set; }
}

public class ProductSmallDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public bool UseInventory { get; set; }
    public int MinQuantity { get; set; }
}

public class ProductFullDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public string Category { get; set; }
    public string CategoryId { get; set; }
    public string PublicId { get; set; }
    public string PictureUrl { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public int MinQuantity { get; set; }
    public int SoldQuantity { get; set; }
    public int Inventory { get; set; }
    public bool Showcase { get; set; }
    public bool UseInventory { get; set; }
    public int? AverageSale { get; set; }
    public decimal CurrentProfit { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public List<ProductBatchDto> Batches { get; set; }
}