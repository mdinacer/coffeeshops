using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DatabaseSeeder
    {
        public static async Task Initialize(DataContext context, UserManager<User> userManager,
        RoleManager<Role> roleManager)
        {
            string[] roleNames = { "Admin", "Owner", "Moderator", "Agent", };

            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    await roleManager.CreateAsync(new Role { Name = roleName });
                }
            }

            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com",
                    Profile = new UserProfile
                    {
                        FirstName = "Abdenasser",
                        LastName = "Mohammedi",
                        Email = "admin@test.com",
                        Mobile = "+213662991735",
                        Address1 = "36 cité les pins Arzew - Oran"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Admin");
            }

            if (!context.Categories.Any())
            {

                var categories = new List<Category>{
                new   Category{
                    Name =  "boissons chaudes",

                    PictureUrl="/assets/images/categories/hot_drink.png",
                    Validated= true,
            },
                new   Category
                {
                    Name = "boissons fraîches",
                    PictureUrl = "/assets/images/categories/fresh_drink.png",
                    Validated= true,
                },
                 new   Category
                 {
                     Name = "boissons gazeuses",
                     PictureUrl = "/assets/images/categories/soda.png",
                     Validated= true,
                 },
                 new   Category
                 {
                     Name = "jus",
                     PictureUrl = "/assets/images/categories/juice.png",
                     Validated= true,
                 },
                 new   Category
                 {
                     Name = "eau minérale",
                     PictureUrl = "/assets/images/categories/water.png",
                     Validated= true,
                 },
                 new   Category
                 {
                     Name = "pains et gateaux",

                     PictureUrl = "/assets/images/categories/cake.png",
                     Validated= true,
                 },
                new   Category
                {
                    Name = "autres",

                    PictureUrl = "/assets/images/categories/other.png",
                     Validated= true,
                },
            };

                context.Categories.AddRange(categories);
                await context.SaveChangesAsync();

            }

            // if (context.Transactions.Any())
            // {
            //     await context.Transactions.Include(t => t.Agent).ForEachAsync(t =>
            //     {
            //         if (t.Amount <= 0)
            //         {
            //             t.Amount = 5000;
            //         }
            //         if (t.Agent != null)
            //         {
            //             t.Type = TransactionType.payment;
            //             var type = t.Agent.Type == AgentType.client ? "Client" : "Fournisseur";
            //             t.Description = $"Paiement de dette {type} - {t.Agent.Name}";
            //         }
            //         else
            //         {
            //             t.Type = TransactionType.transaction;
            //             if (t.Description == "string")
            //             {
            //                 t.Description = null;
            //             }
            //         }
            //     });

            //     await context.SaveChangesAsync();
            // }

            // if (context.Products.Any())
            // {
            //     await context.Products.ForEachAsync(product =>
            //     {
            //         if (product.PictureUrl.StartsWith("assets"))
            //         {
            //             product.PictureUrl = $"/{product.PictureUrl}";
            //         }
            //     });

            //     await context.SaveChangesAsync();
            // }

            // if (context.OperationsElements.Any())
            // {
            //     await context.OperationsElements.ForEachAsync(element =>
            //     {
            //         element.ProductName = element.Product;
            //     });
            //     await context.SaveChangesAsync();
            // }
        }
    }
}