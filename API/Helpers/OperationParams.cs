using API.Models;

namespace API.Helpers;

public class OperationParams : PaginationParams
{
    public string OrderBy { get; set; } = "date";
    public string? SearchTerm { get; set; }
    public ShopOperationType? Type { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}