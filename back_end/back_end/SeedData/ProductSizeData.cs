using back_end.Models;

namespace back_end.SeedData
{
    public class ProductSizeData
    {
        public static ProductSize[] ProductSizeSeedData()
        {
            return new ProductSize[]
            {
               new ProductSize { Id=1,ProductId =  new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), SizeId = 3 },
               new ProductSize { Id=2,ProductId =  new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), SizeId = 4 },
               new ProductSize { Id=3,ProductId =  new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), SizeId = 5 },
               new ProductSize { Id=4,ProductId =  new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), SizeId = 6 },
               new ProductSize { Id=5,ProductId =  new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), SizeId = 7 },
               new ProductSize { Id=6,ProductId =  new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"), SizeId = 8 },

            };
        }
    }
}
