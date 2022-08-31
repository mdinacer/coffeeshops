using API.DTO;

namespace API.Helpers;

public class HistoryParams : PaginationParams
{
    public string OrderBy { get; set; } = "date";
    public string? UserId { get; set; }
    public ShopEntityAction? Action { get; set; }
    public ShopEntityType? Type { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}