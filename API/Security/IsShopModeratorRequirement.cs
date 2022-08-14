using System.Security.Claims;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace API.Security
{
    public class IsShopModeratorRequirement : IAuthorizationRequirement
    {

    }

    public class IsShopModeratorRequirementHandler : AuthorizationHandler<IsShopModeratorRequirement>
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsShopModeratorRequirementHandler(DataContext context, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;

        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsShopModeratorRequirement requirement)
        {
            if (context.User.IsInRole("Admin"))
            {
                context.Succeed(requirement);
                return Task.CompletedTask;
            }

            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = _context.Users.FindAsync(userId).Result;

            if (userId == null || user == null || user.ShopId == null) return Task.CompletedTask;

            var isModeratorRole = context.User.IsInRole("Owner") || context.User.IsInRole("Moderator");


            var shopId = _httpContextAccessor.HttpContext?.Request.Headers["X-SHOP"].ToString();

            if (string.IsNullOrEmpty(shopId)) return Task.CompletedTask;

            var shop = _context.Shops.AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == shopId)
            .Result;

            if (shop == null) return Task.CompletedTask;

            var isMember = shop.Id == user.ShopId;

            if (isModeratorRole && isMember)
            {
                context.Succeed(requirement);
                return Task.CompletedTask;
            }
            else
            {
                return Task.CompletedTask;
            }
        }
    }
}