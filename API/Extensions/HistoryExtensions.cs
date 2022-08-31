using API.DTO;

namespace API.Extensions;

public static class HistoryExtensions
{
    public static IQueryable<HistoryElementDto> Sort(this IQueryable<HistoryElementDto> query, string? orderBy)
    {
        query = orderBy switch
        {
            "date" => query.OrderBy(p => p.Date),
            "dateDesc" => query.OrderByDescending(p => p.Date),

            "action" => query.OrderBy(p => p.Action),
            "actionDesc" => query.OrderByDescending(p => p.Action),

            "type" => query.OrderBy(p => p.EntityType),
            "typeDesc" => query.OrderByDescending(p => p.EntityType),

            "user" => query.OrderBy(p => p.Username),
            "userDesc" => query.OrderByDescending(p => p.Username),


            _ => query.OrderBy(p => p.Date)
        };
        return query;
    }

    public static IQueryable<HistoryElementDto> Filter(this IQueryable<HistoryElementDto> query, string? userId,
        DateTime? startDate, DateTime? endDate, ShopEntityType? type, ShopEntityAction? action)
    {
        if (!string.IsNullOrEmpty(userId))
            query = query.Where(p => p.UserId == userId);

        if (action != null)
            query = query.Where(p => p.Action == action);

        if (type != null)
            query = query.Where(p => p.EntityType == type);

        if (startDate != null)
            query = query.Where(p => p.Date.Date >= startDate.Value.Date);

        if (endDate != null)
            query = query.Where(p => p.Date <= endDate.Value.Date);
        return query;
    }


    internal static bool IsInDateRange(DateTime operationDate, DateTime startDate, DateTime endDate)
    {
        var isValid = operationDate.Date >= startDate && operationDate.Date <= endDate;

        return isValid;
    }
}