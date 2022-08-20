using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<User, Role, string>
    {
        public DbSet<Shop> Shops { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBatch> ProductsBatches { get; set; }
        public DbSet<Operation> Operations { get; set; }
        public DbSet<Agent> Agents { get; set; }
        public DbSet<OperationElement> OperationsElements { get; set; }
        public DbSet<UserProfile> Profiles { get; set; }
        public DbSet<MoneyTransaction> Transactions { get; set; }
        //public DbSet<ShopPayment> Payments { get; set; }


        public DataContext(DbContextOptions options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Shop>()
            .HasMany<User>(s => s.Users)
            .WithOne(u => u.Shop)
            .HasForeignKey(u => u.ShopId);

            builder.Entity<User>()
            .HasOne<UserProfile>(s => s.Profile)
            .WithOne(u => u.User)
            .HasForeignKey<UserProfile>(u => u.UserId)
            .IsRequired(false);

            builder.Entity<Shop>()
                .HasMany(s => s.Operations)
                .WithOne(o => o.Shop)
                .HasForeignKey(o => o.ShopId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Shop>()
                .HasMany(s => s.Products)
                .WithOne(o => o.Shop)
                .HasForeignKey(o => o.ShopId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Shop>()
                .HasMany(s => s.Transactions)
                .WithOne(p => p.Shop)
                .HasForeignKey(p => p.ShopId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Operation>()
                .HasMany(s => s.Elements)
                .WithOne(o => o.Operation)
                .HasForeignKey(o => o.OperationId)
                .OnDelete(DeleteBehavior.Cascade);

            // builder.Entity<Category>()
            //     .HasMany(s => s.Products)
            //     .WithOne(o => o.Category)
            //     .HasForeignKey(o => o.CategoryId)
            //     .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Product>()
            .HasMany(s => s.Batches)
            .WithOne(o => o.Product)
            .HasForeignKey(o => o.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}