namespace API.DTO;

public class ShopOrdersDto
{
    public List<CacheShopOrder> Orders { get; set; }
}

public class CacheShopOrder
{
    public List<CacheOrderElement> Elements { get; set; }
    public int Table { get; set; }
}

public class CacheOrderElement
{
    public string ProductId { get; set; }
    public string ProductName { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}