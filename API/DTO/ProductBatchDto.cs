namespace API.DTO;

public class ProductBatchDto
{
    public string Id { get; set; }
    public DateTime Date { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public int Quantity { get; set; }
    public int LossQuantity { get; set; }
    public int SoldQuantity { get; set; }
    public int ExpiredQuantity { get; set; }
    public int Remain { get; set; }
    public bool Active { get; set; }
    public bool SoldOut { get; set; }
    public bool Expired { get; set; }
}