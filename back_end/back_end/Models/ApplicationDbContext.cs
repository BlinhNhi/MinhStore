﻿using Microsoft.EntityFrameworkCore;
using static System.Collections.Specialized.BitVector32;

namespace back_end.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users{ get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Size> Sizes { get; set; }
        public DbSet<ProductColor> ProductColors { get; set; }
        public DbSet<ProductSize> ProductSizes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<PaymentOrder> PaymentOrders { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<RestrictedWords> RestrictedWords { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>(u =>
            {
                u.HasKey(u => u.Id);
                u.HasData(new User[]
         {
                new User
                {
                    Id =  Guid.NewGuid(),
                    Email="admin@minhstore.com",
                    Password=BCrypt.Net.BCrypt.HashPassword("admin"),
                    Role="Admin"
                },
                new User
                {
                    Id =  Guid.NewGuid(),
                    Email="user123@gmail.com",
                    Password=BCrypt.Net.BCrypt.HashPassword("user123"),
                    Role="User"
                },
                    new User
                {
                    Id =  Guid.NewGuid(),
                    Email="user456@gmail.com",
                    Password=BCrypt.Net.BCrypt.HashPassword("user456"),
                    Role="User"
                },
                        new User
                {
                    Id =  Guid.NewGuid(),
                    Email="user789@gmail.com",
                    Password=BCrypt.Net.BCrypt.HashPassword("user789"),
                    Role="User"
                },

         });});
            modelBuilder.Entity<Category>(p =>
            {
                p.HasKey(p => p.Id);
                p.HasData(SeedData.categoryData.CategorySeedData());
            });
            modelBuilder.Entity<Color>(c =>
            {
                c.HasKey(c => c.Id);
                c.HasData(SeedData.colorData.ColorSeedData());
            });
            modelBuilder.Entity<Size>(s =>
            {
                s.HasKey(s => s.Id);
                s.HasData(SeedData.sizeData.SizeSeedData());
            });
            modelBuilder.Entity<Color>()
               .HasMany(e => e.Products)
               .WithMany(e => e.Colors)
               .UsingEntity<ProductColor>();
            modelBuilder.Entity<Size>()
               .HasMany(e => e.Products)
               .WithMany(e => e.Sizes)
               .UsingEntity<ProductSize>();
            modelBuilder.Entity<ProductColor>(b =>
            {
                b.HasKey(b => new { b.ColorId, b.ProductId });
                b.HasData(SeedData.ProductColorData.ProductColorsSeedData());
            });
            modelBuilder.Entity<ProductSize>(b =>
            {
                b.HasKey(b => new { b.SizeId, b.ProductId });
                b.HasData(SeedData.ProductSizeData.ProductSizeSeedData());

            });
            modelBuilder.Entity<Product>(p =>
            {
                p.HasKey(p => p.Id);
                p.HasOne(o => o.Category).WithMany(o => o.Products).HasForeignKey(h => h.CategoryId);
                p.HasData(SeedData.productData.ProductSeedData());
            });

            modelBuilder.Entity<Order>(o =>
            {
                o.HasKey(n => n.Id);
                o.HasOne(o => o.User).WithMany(o => o.Orders).HasForeignKey(u => u.UserId);
                o.HasOne(o => o.Color).WithMany(o => o.Orders).HasForeignKey(u => u.ColorId);
                o.HasOne(o => o.Size).WithMany(o => o.Orders).HasForeignKey(u => u.SizeId);
            });
            modelBuilder.Entity<OrderProduct>(op =>
            {
                op.HasKey(op => new { op.ProductId, op.OrderId });
            });
            modelBuilder.Entity<Payment>(pay =>
            {
                pay.HasKey(n => n.Id);
                pay.HasOne(pay => pay.User).WithMany(o => o.Payments).HasForeignKey(u => u.UserId);
            });
            modelBuilder.Entity<Order>()
               .HasMany(o => o.Payments)
               .WithMany(o => o.Orders)
               .UsingEntity<PaymentOrder>();
            modelBuilder.Entity<PaymentOrder>(pay =>
            {
                pay.HasKey(pay => new { pay.OrderId, pay.PaymentId });

            });

            modelBuilder.Entity<Comment>()
               .HasOne(c => c.Product)
               .WithMany(p => p.Comments)
               .HasForeignKey(c => c.ProductId);

            modelBuilder.Entity<Comment>()
               .HasOne(c => c.User)
               .WithMany(u => u.Comments)
               .HasForeignKey(c => c.UserId);

            modelBuilder.Entity<RestrictedWords>(c =>
            {
                c.HasKey(c => c.Id);
            });
        }
    }
}
