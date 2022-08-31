using System.Security.Claims;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace API.Security;

public class IsShopOwnerRequirement : IAuthorizationRequirement
{
}

public class IsShopOwnerRequirementHandler : AuthorizationHandler<IsShopOwnerRequirement>
{
    private readonly DataContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public IsShopOwnerRequirementHandler(DataContext context, IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _context = context;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
        IsShopOwnerRequirement requirement)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null) return Task.CompletedTask;

        var isOwnerRole = context.User.IsInRole("Owner");

        var shopId = _httpContextAccessor.HttpContext?.Request.Headers["X-SHOP"].ToString();

        if (string.IsNullOrEmpty(shopId)) return Task.CompletedTask;

        var shop = _context.Shops.AsNoTracking()
            .SingleOrDefaultAsync(x => x.OwnerId == userId && x.Id == shopId)
            .Result;

        if (shop == null) return Task.CompletedTask;

        context.Succeed(requirement);
        return Task.CompletedTask;
    }
}