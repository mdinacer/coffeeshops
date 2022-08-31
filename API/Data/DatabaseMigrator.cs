using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

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

    // private static async Task TestMail(IConfiguration config, ILogger<Program> logger)
    // {
    //     logger.LogInformation("Sendding mail");
    //     var apiKey = config["Sendgrid:Key"];
    //     var user = config["Sendgrid:User"];
    //     var client = new SendGridClient(apiKey);
    //     var from = new EmailAddress(user, "Example User");
    //     var subject = "Sending with SendGrid is Fun";
    //     var to = new EmailAddress("test@example.com", "Example User");
    //     var plainTextContent = "and easy to do anywhere, even with C#";
    //     var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
    //     var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
    //     var response = await client.SendEmailAsync(msg);
    //     logger.LogInformation(response.ToString());
    // }
}