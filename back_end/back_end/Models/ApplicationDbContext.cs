using Microsoft.EntityFrameworkCore;
using static System.Collections.Specialized.BitVector32;

namespace back_end.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Product> Product { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
          /*  modelBuilder.Entity<Product>()
                .Property(p
     => p.CreatedAt)
                .HasDefaultValueSql("getutcdate()"); // adjust based on your database

            modelBuilder.Entity<Product>()
                .Property(p => p.UpdatedAt)
                .HasDefaultValueSql("getutcdate()"); // adjust based on your database

            modelBuilder.Entity<Product>()
                .HasQueryFilter(p => p.DeletedAt == null); // soft delete*/
        }
    }
}
