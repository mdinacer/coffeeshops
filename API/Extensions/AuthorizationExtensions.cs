using API.Security;
using Microsoft.AspNetCore.Authorization;

namespace API.Extensions
{
    public static class AuthorizationExtensions
    {
        public static IServiceCollection AddAuthorizationConfig(this IServiceCollection services)
        {
            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsShopMember", policy => { policy.Requirements.Add(new IsShopMemberRequirement()); });
                opt.AddPolicy("IsShopOwner", policy => { policy.Requirements.Add(new IsShopOwnerRequirement()); });
                opt.AddPolicy("IsShopModerator", policy => { policy.Requirements.Add(new IsShopModeratorRequirement()); });
            });
            services.AddTransient<IAuthorizationHandler, IsShopMemberRequirementHandler>();
            services.AddTransient<IAuthorizationHandler, IsShopOwnerRequirementHandler>();
            services.AddTransient<IAuthorizationHandler, IsShopModeratorRequirementHandler>();
            return services;
        }

    }
}