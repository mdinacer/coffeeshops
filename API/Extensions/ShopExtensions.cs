using API.Models;

namespace API.Extensions
{
    public static class ShopExtensions
    {
        public static IQueryable<Shop> Sort(this IQueryable<Shop> query, string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return query.OrderBy(p => p.Name);

            query = orderBy switch
            {
                "id" => query.OrderBy(p => p.Id),
                _ => query.OrderBy(p => p.Name),
            };
            return query;
        }

        public static IQueryable<Shop> Search(this IQueryable<Shop> query, string? searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return query;

            searchTerm = searchTerm.Trim().ToLower();

            query = query.Where(p => p.Name.ToLower().Contains(searchTerm));
            return query;
        }


        // public static IQueryable<Shop> Filter(this IQueryable<Shop> query, int? category)
        // {
        //     if (category is >= 0)
        //         query = query.Where(p => p.CategoryId == category);

        //     return query;
        // }
    }
}