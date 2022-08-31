using API.Models;

namespace API.Helpers;

public class TransactionsParams : PaginationParams
{
    public string OrderBy { get; set; } = "date";
    public string? SearchTerm { get; set; }
    public TransactionDirection? Direction { get; set; }
    public TransactionType? Type { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}