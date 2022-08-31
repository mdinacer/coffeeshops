namespace API.DTO;

public class OperationElementDto
{
    public string Id { get; set; }
    public DateTime Date { get; set; }
    public string ProductId { get; set; }
    public string ProductName { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal Total { get; set; }
    public string OperationId { get; set; }
}

public class CreateOperationElementDto
{
    public string ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public DateTime? ExpiryDate { get; set; }
}

public class EditOperationElementDto
{
    public string Id { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}