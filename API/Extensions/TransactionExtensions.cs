using API.Models;

namespace API.Extensions;

public static class TransactionExtensions
{
    public static IQueryable<MoneyTransaction> Sort(this IQueryable<MoneyTransaction> query, string? orderBy)
    {
        if (string.IsNullOrWhiteSpace(orderBy))
            return query.OrderBy(p => p.Date);

        query = orderBy switch
        {
            "id" => query.OrderBy(p => p.Id),
            "idDesc" => query.OrderByDescending(p => p.Id),
            "date" => query.OrderBy(p => p.Date),
            "dateDesc" => query.OrderByDescending(p => p.Date),
            "amount" => query.OrderBy(p => p.Amount),
            "amountDesc" => query.OrderByDescending(p => p.Amount),
            "type" => query.OrderBy(p => p.Type),
            "typeDesc" => query.OrderByDescending(p => p.Type),
            "direction" => query.OrderBy(p => p.Direction),
            "directionDesc" => query.OrderByDescending(p => p.Direction),
            _ => query.OrderBy(p => p.Date)
        };
        return query;
    }


    public static IQueryable<MoneyTransaction> Filter(this IQueryable<MoneyTransaction> query, TransactionType? type,
        TransactionDirection? direction, DateTime? startDate, DateTime? endDate)
    {
        if (direction != null)
            query = query.Where(p => p.Direction == direction);

        if (type != null)
            query = query.Where(p => p.Type == type);

        if (startDate != null)
            query = query.Where(p => p.Date.Date >= startDate.Value.Date);

        if (endDate != null) query = query.Where(p => p.Date <= endDate.Value.Date.AddHours(24));

        return query;
    }


    internal static bool IsInDateRange(DateTime operationDate, DateTime startDate, DateTime endDate)
    {
        var isValid = operationDate.Date >= startDate && operationDate.Date <= endDate;

        return isValid;
    }
}