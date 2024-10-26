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
    }
}
