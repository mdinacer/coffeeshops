using API.Models;

namespace API.Extensions;

public static class ProductExtensions
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderBy)
    {
        if (string.IsNullOrWhiteSpace(orderBy))
            return query.OrderBy(p => p.Name);

        query = orderBy switch
        {
            "name" => query.OrderBy(p => p.Name),
            "nameDesc" => query.OrderByDescending(p => p.Name),

            "id" => query.OrderBy(p => p.Id),
            "idDesc" => query.OrderByDescending(p => p.Id),

            "category" => query.OrderBy(p => p.CategoryId),
            "categoryDesc" => query.OrderByDescending(p => p.CategoryId),

            "inventory" => query.OrderBy(p => p.Quantity - p.SoldQuantity),
            "inventoryDesc" => query.OrderByDescending(p => p.Quantity - p.SoldQuantity),

            "price" => query.OrderBy(p => p.Price),
            "priceDesc" => query.OrderByDescending(p => p.Price),

            "sold" => query.OrderBy(p => p.SoldQuantity),
            "soldDesc" => query.OrderByDescending(p => p.SoldQuantity),
            _ => query.OrderBy(p => p.Name)
        };
        return query;
    }

    public static IQueryable<Product> Search(this IQueryable<Product> query, string? searchTerm)
    {
        if (string.IsNullOrWhiteSpace(searchTerm))
            return query;

        searchTerm = searchTerm.Trim().ToLower();

        query = query.Where(p => p.Name.ToLower().Contains(searchTerm));
        return query;
    }


    public static IQueryable<Product> Filter(this IQueryable<Product> query, string? categoryId)
    {
        if (!string.IsNullOrEmpty(categoryId))
            query = query.Where(p => p.CategoryId == categoryId);



        return query;
    }
}