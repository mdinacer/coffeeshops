namespace API.Models;

public class ProductBatch : ShopEntity
{
    public DateTime Date { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public int LossQuantity { get; set; }
    public int SoldQuantity { get; set; }
    public int ExpiredQuantity { get; set; }
    public string ProductId { get; set; }
    public Product Product { get; set; }
    public bool Active { get; set; }
    public bool SoldOut { get; set; }
    public decimal Profit { get; set; }

    public string? ProviderId { get; set; }
    public string? Provider { get; set; }

    public int GetRemain()
    {
        return Quantity - (SoldQuantity + ExpiredQuantity + LossQuantity);
    }

    public bool GetExpired()
    {
        return ExpiryDate != null ? ExpiryDate.Value.Date < DateTime.UtcNow.Date : false;
    }

    public decimal GetCurrentProfit()
    {
        return Profit * SoldQuantity;
    }

    public decimal GetTotalProfit()
    {
        return Profit * Quantity;
    }

    public void CheckExpiry()
    {
        if (ExpiryDate != null)
            if (ExpiryDate.Value.Date < DateTime.Now.Date)
            {
                ExpiredQuantity = GetRemain();
                Active = false;
            }
    }
}