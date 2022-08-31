using API.Models;

namespace API.Extensions;

public static class ShopAgentExtensions
{
    public static IQueryable<Agent> Sort(this IQueryable<Agent> query, string? orderBy)
    {
        if (string.IsNullOrWhiteSpace(orderBy))
            return query.OrderBy(agent => agent.Name);

        query = orderBy switch
        {
            "name" => query.OrderBy(agent => agent.Name),
            "nameDesc" => query.OrderByDescending(agent => agent.Name),

            "id" => query.OrderBy(agent => agent.Id),
            "idDesc" => query.OrderByDescending(agent => agent.Id),

            "total" => query.OrderBy(agent => agent.Total),
            "totalDesc" => query.OrderByDescending(agent => agent.Total),

            "paid" => query.OrderBy(agent => agent.Paid),
            "paidDesc" => query.OrderByDescending(agent => agent.Paid),

            "remain" => query.OrderBy(agent => agent.Total - agent.Paid),
            "remainDesc" => query.OrderByDescending(agent => agent.Total - agent.Paid),


            _ => query.OrderBy(p => p.Name)
        };
        return query;
    }

    public static IQueryable<Agent> Search(this IQueryable<Agent> query, string? searchTerm)
    {
        if (string.IsNullOrWhiteSpace(searchTerm))
            return query;

        searchTerm = searchTerm.Trim().ToLower();

        query = query.Where(agent => agent.Name.ToLower().Contains(searchTerm));
        return query;
    }


    public static IQueryable<Agent> Filter(this IQueryable<Agent> query, AgentType type, bool? debtOnly = null)
    {
        if (debtOnly != null && debtOnly == true) query = query.Where(agent => agent.GetDebt() > 0);


        return query.Where(agent => agent.Type == type);
    }
}