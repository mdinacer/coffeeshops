using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public static class DatabaseMigrator
    {
        public static async Task Migrate(WebApplicationBuilder builder)
        {
            using var scope = builder.Services.BuildServiceProvider().CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<DataContext>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

            try
            {
                await context.Database.MigrateAsync();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error during migrations");
            }

            try
            {
                await DatabaseSeeder.Initialize(context, userManager, roleManager);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error during Data Seeding");
            }
        }
    }
}