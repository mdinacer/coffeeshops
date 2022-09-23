using Microsoft.EntityFrameworkCore;

namespace API.Helpers;

public class PagedList<T> : List<T>
    where T : class
{
    public PagedList(List<T> items, int count, int pageNumber, int pageSize)
    {
        MetaData = new MetaData
        {
            TotalCount = count,
            PageSize = pageSize,
            CurrentPage = pageNumber,
            TotalPages = (int)Math.Ceiling(count / (double)pageSize)
        };
        AddRange(items);
    }

    public MetaData MetaData { get; set; }

    public static async Task<PagedList<T>> CreateAsync(IQueryable<T> query, int pageNumber, int pageSize)
    {
        var count = await query.CountAsync();

        var items = await query.Skip((pageNumber - 1) * pageSize)
                .Take(pageSize).ToListAsync();

        return new PagedList<T>(items, count, pageNumber, pageSize);
    }

    public static PagedList<T> Create(IQueryable<T> query, int pageNumber, int pageSize)
    {
        var count = query.Count();
        var items = query.Skip((pageNumber - 1) * pageSize)
            .Take(pageSize).ToList();

        return new PagedList<T>(items, count, pageNumber, pageSize);
    }
}