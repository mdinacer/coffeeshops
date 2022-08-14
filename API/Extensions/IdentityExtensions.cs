using API.Data;
using API.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Extensions
{
    public static class IdentityExtensions
    {
        public static IServiceCollection AddIdentityConfig(this IServiceCollection services)
        {
            services.AddIdentityCore<User>(opt =>
            {
                opt.User.RequireUniqueEmail = true;
                opt.Password.RequireNonAlphanumeric = false;
                opt.SignIn.RequireConfirmedEmail = true;
            })
            .AddRoles<Role>()
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<User>>()
            .AddDefaultTokenProviders();


            return services;
        }
    }
}