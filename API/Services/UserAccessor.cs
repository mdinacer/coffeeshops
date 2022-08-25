using System.Security.Claims;
using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public static class UserAccessor
    {

        public static string GetUsername(HttpContext httpContext)
        {
            return httpContext.User.FindFirstValue(ClaimTypes.Name);
        }
        public static async Task<User?> GetUser(HttpContext httpContext, DataContext context)
        {
            var username = httpContext.User.FindFirstValue(ClaimTypes.Name);
            if (string.IsNullOrEmpty(username)) return null;

            var user = await context.Users
                .Include(u => u.Shop)
                .SingleOrDefaultAsync(u => u.UserName == username);

            return user;
        }


    }
}