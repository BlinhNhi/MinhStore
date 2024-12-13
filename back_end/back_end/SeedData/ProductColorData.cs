using back_end.Models;
using Org.BouncyCastle.Math.EC.Rfc7748;

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

               new ProductColor { Id=5,ProductId =  new Guid("07401f68-4576-4079-adc4-dd650f677fd3"), ColorId = 12 },

               new ProductColor { Id=6,ProductId =  new Guid("0b7eeadd-9b05-4083-a1d9-ab92f3df285c"), ColorId = 6 },
               new ProductColor { Id=7,ProductId =  new Guid("0b7eeadd-9b05-4083-a1d9-ab92f3df285c"), ColorId = 10 },

               new ProductColor { Id=8,ProductId =  new Guid("39978fd8-a449-47b6-b8ed-0e3461a20073"), ColorId = 1 },
               new ProductColor { Id=9,ProductId =  new Guid("39978fd8-a449-47b6-b8ed-0e3461a20073"), ColorId = 10 },

               new ProductColor { Id=10,ProductId =  new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), ColorId = 3 },
               new ProductColor { Id=11,ProductId =  new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), ColorId = 6 },
               new ProductColor { Id=12,ProductId =  new Guid("52623100-c0e1-460a-9bca-5dfe2592f9cf"), ColorId = 8 },

               new ProductColor { Id=13,ProductId =  new Guid("55b9e08d-d622-47ea-b341-bad40def946d"), ColorId = 4 },
               new ProductColor { Id=14,ProductId =  new Guid("55b9e08d-d622-47ea-b341-bad40def946d"), ColorId = 5 },

               new ProductColor { Id=15,ProductId =  new Guid("6c8e2d97-0c60-4812-acd8-868a1affbd73"), ColorId = 3 },
               new ProductColor { Id=16,ProductId =  new Guid("6c8e2d97-0c60-4812-acd8-868a1affbd73"), ColorId = 5 },
               new ProductColor { Id=17,ProductId =  new Guid("6c8e2d97-0c60-4812-acd8-868a1affbd73"), ColorId = 9 },

               new ProductColor { Id=18,ProductId =  new Guid("71b39c26-230a-4331-a448-c6144cf99e7f"), ColorId = 5 },
               new ProductColor { Id=19,ProductId =  new Guid("71b39c26-230a-4331-a448-c6144cf99e7f"), ColorId = 8 },

               new ProductColor { Id=20,ProductId =  new Guid("7cd6924c-8938-4530-857a-3055efb9311a"), ColorId = 8 },

               new ProductColor { Id=21,ProductId =  new Guid("89dafb16-28e7-4fa9-b66d-ca8b944db261"), ColorId = 8 },
               new ProductColor { Id=22,ProductId =  new Guid("89dafb16-28e7-4fa9-b66d-ca8b944db261"), ColorId = 5 },
               new ProductColor { Id=23,ProductId =  new Guid("89dafb16-28e7-4fa9-b66d-ca8b944db261"), ColorId = 9 },

               new ProductColor { Id=24,ProductId =  new Guid("8cb945b1-c6ab-4237-8501-0e05f4e6aa83"), ColorId = 1 },
               new ProductColor { Id=25,ProductId =  new Guid("8cb945b1-c6ab-4237-8501-0e05f4e6aa83"), ColorId = 8 },

               new ProductColor { Id=26,ProductId =  new Guid("b03034a9-9058-4a83-b146-92ba1a217c83"), ColorId = 8 },

               new ProductColor { Id=27,ProductId =  new Guid("b5ac0163-7d9d-43b4-a980-44e42e4999ed"), ColorId = 2 },
               new ProductColor { Id=28,ProductId =  new Guid("b5ac0163-7d9d-43b4-a980-44e42e4999ed"), ColorId = 8 },  
               
               new ProductColor { Id=29,ProductId =  new Guid("bb1da4ee-31df-4fb6-916a-1548acfdc111"), ColorId = 8 },

       /*        new ProductColor { Id=30,ProductId =  new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), ColorId = 5 },
               new ProductColor { Id=31,ProductId =  new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), ColorId = 6 },
               new ProductColor { Id=32,ProductId =  new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), ColorId = 8 },
               new ProductColor { Id=33,ProductId =  new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), ColorId = 9 },
               new ProductColor { Id=34,ProductId =  new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), ColorId = 11 },*/

               new ProductColor { Id=30,ProductId =  new Guid("ccfde94d-62dc-4ec7-8538-c800e00c280d"), ColorId = 5 },
               new ProductColor { Id=31,ProductId =  new Guid("ccfde94d-62dc-4ec7-8538-c800e00c280d"), ColorId = 8 },

               new ProductColor { Id=32,ProductId =  new Guid("d3c4f6cf-a03c-4c1f-bc4b-52f2d1aaf228"), ColorId = 8 },
               new ProductColor { Id=33,ProductId =  new Guid("d3c4f6cf-a03c-4c1f-bc4b-52f2d1aaf228"), ColorId = 1 },
               new ProductColor { Id=34,ProductId =  new Guid("d3c4f6cf-a03c-4c1f-bc4b-52f2d1aaf228"), ColorId = 3 },

               new ProductColor { Id=35,ProductId =  new Guid("ecc825cb-9cce-4597-9369-a9e543700d26"), ColorId = 5 },
               new ProductColor { Id=36,ProductId =  new Guid("ecc825cb-9cce-4597-9369-a9e543700d26"), ColorId = 8 },

               new ProductColor { Id=37,ProductId =  new Guid("e0f75a82-e1f0-40de-bd43-57ce0c1d52b7"), ColorId = 7 },
               new ProductColor { Id=38,ProductId =  new Guid("e0f75a82-e1f0-40de-bd43-57ce0c1d52b7"), ColorId = 8 },

               new ProductColor { Id=39,ProductId =  new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), ColorId = 5 },
               new ProductColor { Id=40,ProductId =  new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), ColorId = 6},
               new ProductColor { Id=41,ProductId =  new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), ColorId = 8 },
               new ProductColor { Id=42,ProductId =  new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), ColorId = 9 },
               new ProductColor { Id=43,ProductId =  new Guid("c76f49c6-01dc-437d-a9a6-7c90c4e03b48"), ColorId = 11 },


            };
        }
    }
}
