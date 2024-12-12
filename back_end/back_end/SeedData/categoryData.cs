using back_end.Models;

namespace back_end.SeedData
{
    public class categoryData
    {
        public static Category[] CategorySeedData()
        {
            return new Category[]
            { 
            new Category { Id = 1, Name = "Adidas" },
            new Category { Id = 2, Name = "Nike" },
            new Category { Id = 3, Name = "Puma" },
            new Category { Id = 4, Name = "Louis Vuitton" },
            new Category { Id = 5, Name = "Jordan" },
            new Category { Id = 6, Name = "Convert" },
            new Category { Id = 7, Name = "Canvas" }
            };
        }
    }
}
