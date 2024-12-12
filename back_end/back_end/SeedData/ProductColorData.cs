using back_end.Models;

namespace back_end.SeedData
{
    public class ProductColorData
    {
        public static ProductColor[] ProductColorsSeedData()
        {
            return new ProductColor[]
            {
               new ProductColor { Id=1,ProductId =  new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), ColorId = 5 },
               new ProductColor { Id=2,ProductId =  new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), ColorId = 8 },
               new ProductColor { Id=3,ProductId =  new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), ColorId = 9 },
               new ProductColor { Id=4,ProductId =  new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), ColorId = 10 },
            };
        }
    }
}
