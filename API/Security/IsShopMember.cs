using System.Security.Claims;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace API.Security
{
    public class IsShopMemberRequirement : IAuthorizationRequirement
    {

    }

    public class IsShopMemberRequirementHandler : AuthorizationHandler<IsShopMemberRequirement>
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsShopMemberRequirementHandler(DataContext context, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;

        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsShopMemberRequirement requirement)
        {
            if (context.User.IsInRole("Admin"))
            {
                context.Succeed(requirement);
                return Task.CompletedTask;
            }

            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = _context.Users.FindAsync(userId).Result;


            if (userId == null || user == null || user.ShopId == null) return Task.CompletedTask;

            var shopId = _httpContextAccessor.HttpContext?.Request.Headers["X-SHOP"].ToString();

            if (string.IsNullOrEmpty(shopId)) return Task.CompletedTask;
            //var shopId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var shop = _context.Shops.AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == shopId)
            .Result;

            if (shop == null) return Task.CompletedTask;


            var isMember = user.ShopId == shop.Id;

            if (isMember)
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