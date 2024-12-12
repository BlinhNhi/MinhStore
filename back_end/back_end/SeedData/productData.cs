using back_end.Models;

namespace back_end.SeedData
{
    public class productData
    {
        public static Product[] ProductSeedData()
        {
            return new Product[]
            {
            new Product {
                Id = new Guid("01087e47-19aa-4ae9-8670-ee69d9223a02"),
                PriceProduct = 7000000,
                NameProduct = "Adidas Ultra Boost",
                StockQuantity = 14,
                NumberOfProductSold = 1,
                NumberOfProductInStock = 13,
                ImagesProduct = "[\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860256/gdw7lxyps83b8lb4e0dz.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860258/r8zcqx920jtawfm9xdap.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860259/jgjf7f9q5frtfogz2pap.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860260/vw8c53g4pm8z5kfv6huc.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860262/siexn3ygexvctydme2s6.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860263/up71kjl9srrx5nhxp9g8.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860265/y5wghhvrlc51qtpfgovm.jpg\",\"https://res.cloudinary.com/dsxrhkdnh/image/upload/v1731860266/plkiqeg9qxzek1map7ei.jpg\"]",
               /* Category=  new Category
                {
                    Id = 1,
                    Name = "Adidas"
                },*/
                ColorId = "5,8,9,10",
                SizeId="3,4,5,6,7,8",
                CategoryId = 1,
                CreatedDate = new DateTime(2024, 11, 17),
               /* Colors = new List<Color>
                {
                   new Color { Id = 5, Name = "Đen" },
                   new Color { Id = 8, Name = "Trắng" },
                   new Color { Id = 9, Name = "Xám" },
                   new Color { Id = 10, Name = "Xanh Dương" }
                }
                ,
                Sizes = new List<Size>
                {
                    new Size { Id = 3, NumberOfSize = "38" },
                    new Size { Id = 4, NumberOfSize = "39" },
                    new Size { Id = 5, NumberOfSize = "40" },
                    new Size { Id = 6, NumberOfSize = "41" },
                    new Size { Id = 7, NumberOfSize = "42" },
                    new Size { Id = 8, NumberOfSize = "43" }
                }*/
            },


            };


        }
    }
}
