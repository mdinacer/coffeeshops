namespace API.Models.ShopChartsData;

public class StatsElement
{
    public string Title { get; set; }
    public List<StatElementData> ElementData { get; set; } = new();
    public decimal TotalIncoming { get; set; }
    public decimal TotalOutgoing { get; set; }
    public decimal TotalPurchases { get; set; }
    public decimal TotalPurchasesPaid { get; set; }
    public decimal TotalSales { get; set; }
    public decimal TotalSalesPaid { get; set; }
    public decimal TotalLoss { get; set; }
}