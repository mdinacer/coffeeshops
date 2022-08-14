using API.Models;

namespace API.Extensions
{
    public static class OperationExtensions
    {
        public static IQueryable<Operation> Sort(this IQueryable<Operation> query, string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return query.OrderBy(p => p.Date);

            query = orderBy switch
            {
                "id" => query.OrderBy(p => p.Id),
                "idDesc" => query.OrderByDescending(p => p.Id),
                "date" => query.OrderBy(p => p.Type),
                "dateDesc" => query.OrderByDescending(p => p.Type),
                "total" => query.OrderBy(p => p.Total),
                "totalDesc" => query.OrderByDescending(p => p.Total),
                "remain" => query.OrderBy(p => p.Total - p.Paid),
                "remainDesc" => query.OrderByDescending(p => p.Total - p.Paid),
                _ => query.OrderBy(p => p.Date),
            };
            return query;
        }

        // public static IQueryable<Operation> Search(this IQueryable<Operation> query, string? searchTerm)
        // {
        //     if (string.IsNullOrWhiteSpace(searchTerm))
        //         return query;

        //     searchTerm = searchTerm.Trim().ToLower();

        //     query = query.Where(p => p.Name.ToLower().Contains(searchTerm));
        //     return query;
        // }


        public static IQueryable<Operation> Filter(this IQueryable<Operation> query, ShopOperationType? type, DateTime? startDate, DateTime? endDate)
        {
            if (type != null)
                query = query.Where(p => p.Type == type);

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
}