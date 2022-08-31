namespace API.Models;

public class OperationElement : BaseEntity
{
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public string ProductId { get; set; }
    public Product Product { get; set; }
    public string ProductName { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public string OperationId { get; set; }
    public Operation Operation { get; set; }


    public decimal GetTotal()
    {
        return Price * Quantity;
    }
}