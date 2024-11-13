using back_end.IRepository;
using back_end.Models;
using Microsoft.EntityFrameworkCore;
using MySqlX.XDevAPI.Common;
using System;

namespace back_end.Services
{
    public class ProductService : IProductRepo
    {
        private readonly ApplicationDbContext db;
        private readonly IWebHostEnvironment env;
        public ProductService(ApplicationDbContext db, IWebHostEnvironment env)
        {
            this.db = db;
            this.env = env;
        }

        public static int PAGE_SIZE_EIGHT_PRODUCTS { get; set; } = 8;

        public async Task<IEnumerable<Product>> GetAllProduct()
        {
            return await db.Products
                .Include(p => p.Category) // Kết nối với Category
                .Include(p => p.Colors) // Kết nối với Colors
                .Include(p => p.Sizes) // Kết nối với Sizes
                .Select(p => new Product()
                {
                    Id = p.Id,
                    NameProduct = p.NameProduct,
                    PriceProduct = p.PriceProduct,
                    StockQuantity = p.StockQuantity,
                    NumberOfProductSold = p.NumberOfProductSold,
                    NumberOfProductInStock = p.NumberOfProductInStock,
                    ImagesProduct = p.ImagesProduct,
                    CreatedDate = p.CreatedDate,
                   /* ColorId = p.ColorId,*/
                    Colors = p.Colors, // Lấy Colors liên kết
                  /*  SizeId = p.SizeId,*/
                    Sizes = p.Sizes, // Lấy Sizes liên kết
                    Category = new Category() // Gán Category
                    {
                        Id = p.Category.Id,
                        Name = p.Category.Name,
                    }
                })
                .ToListAsync();
        }


        public async Task<bool> CreateProduct(Product product)
        {
            try
            {
                Category category = db.Categories.Where(c => c.Id == product.CategoryId).FirstOrDefault();
                product.Category = category;
                await db.Products.AddAsync(product);
                await db.SaveChangesAsync();

                if (product.ColorId != null)
                {
                    List<string> list = product.ColorId.Split(",").ToList();
                    for (int i = 0; i < list.Count; i++)
                    {
                        int id = Int32.Parse(list[i]);
                        ProductColor color = new ProductColor { ProductId = product.Id, ColorId = id };
                        db.ProductColors.Add(color);
                        await db.SaveChangesAsync();
                    }
                }
                if (product.SizeId != null)
                {
                    List<string> list = product.SizeId.Split(",").ToList();
                    for (int i = 0; i < list.Count; i++)
                    {
                        int id = Int32.Parse(list[i]);
                        ProductSize size = new ProductSize { ProductId = product.Id, SizeId = id };
                        db.ProductSizes.Add(size);
                        await db.SaveChangesAsync();
                    }
                }
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public async Task<IEnumerable<Product>> GetProductById(Guid Id)
        {
            return await db.Products.Include(c=>c.Category).Include(co=>co.Colors).Where(p=>p.Id == Id).Include(si=>si.Sizes).Where(p=>p.Id == Id).ToListAsync();
        }


        public async Task<bool> PutProduct(Guid Id, Product product)
        {
            var ExistingProduct = await db.Products.SingleOrDefaultAsync(p=>p.Id == Id);
            if (ExistingProduct != null)
            {
                Category category = db.Categories.Where(ca => ca.Id == product.CategoryId).FirstOrDefault();

                ExistingProduct.PriceProduct = product.PriceProduct;
                ExistingProduct.NameProduct = product.NameProduct;
                ExistingProduct.StockQuantity = product.StockQuantity;
                ExistingProduct.NumberOfProductSold = product.NumberOfProductSold;
                ExistingProduct.NumberOfProductInStock = product.NumberOfProductInStock;
                ExistingProduct.ImagesProduct = product.ImagesProduct;
                ExistingProduct.ColorId = product.ColorId;
                ExistingProduct.SizeId = product.SizeId;
                ExistingProduct.Category = category;

                var color = await db.ProductColors.Where(pc => pc.ProductId == Id).ToListAsync();
                foreach (var i in color)
                {   
                    db.ProductColors.Remove(i);
                    await db.SaveChangesAsync();
                }
                var ProductID = Id;
                if(product.ColorId != null)
                {
                    List<string> list = product.ColorId.Split(",").ToList();
                    for (int i = 0; i < list.Count; i++)
                    {
                        int id = Int32.Parse(list[i]);
                        ProductColor newColor = new ProductColor { ProductId = ProductID, ColorId = id };
                        db.ProductColors.Add(newColor);
                        await db.SaveChangesAsync();
                    }
                }

                var size = await db.ProductSizes.Where(pc => pc.ProductId == Id).ToListAsync();
                foreach (var i in size)
                {
                    db.ProductSizes.Remove(i);
                    await db.SaveChangesAsync();
                }
                if (product.SizeId != null)
                {
                    List<string> list = product.SizeId.Split(",").ToList();
                    for (int i = 0; i < list.Count; i++)
                    {
                        int id = Int32.Parse(list[i]);
                        ProductSize newSize = new ProductSize { ProductId = ProductID, SizeId = id };
                        db.ProductSizes.Add(newSize);
                        await db.SaveChangesAsync();
                    }
                }
                await db.SaveChangesAsync();
                return true;
            }
            else { return false; }
        }

        public async Task<Product> DeleteProduct(Guid Id)
        {
            var ExistingProduct = await db.Products.SingleOrDefaultAsync(p => p.Id == Id);
            if (ExistingProduct != null)
            {
                db.Products.Remove(ExistingProduct);
                int result = await db.SaveChangesAsync();
                if (result == 0)
                {
                    return null;
                }
                else
                {
                    return ExistingProduct;
                }
            }
            return null;
        }

        public List<Product> OptionsAsDesired(string? searchName, string? searchCategory, string? searchColor,string? searchSize, string? fromPrice, string? toPrice, string? sort, string? createDay)
        {
           var allProducts = db.Products.Include(ca=>ca.Category).Include(c=>c.Colors).Include(s=>s.Sizes).AsQueryable();

            var p = searchCategory;
            var sc = searchColor;
            var ss = searchSize;
            if (!string.IsNullOrEmpty(searchName))
            {
                allProducts = allProducts.Where(pro => pro.NameProduct.Contains(searchName));
            }
            if (!string.IsNullOrEmpty(searchCategory))
            {   
                List<string> list = searchCategory.Split(",").ToList();
                if(list.Any())
                {
                    allProducts = allProducts.Where(pr => list.Contains(pr.Category.Name));
                }
            }
            if (!string.IsNullOrEmpty(searchColor))
            {
                List<string> selectedColors = searchColor.Split(",").ToList();
                if (selectedColors.Count > 1)
                {
                    allProducts = allProducts.Where(pr => pr.Colors.Any(c => selectedColors.Contains(c.Name)));
                }
                else 
                {
                    allProducts = allProducts.Where(pr => pr.Colors.Any(c => c.Name == selectedColors[0]));
                }
                if (!allProducts.Any())
                {
                    return null;
                }
            }
            if (!string.IsNullOrEmpty(searchSize))
            {
                List<string> searchSizes = searchSize.Split(",").ToList();
                if (searchSizes.Count > 1)
                {
                    allProducts = allProducts.Where(pr => pr.Sizes.Any(c => searchSizes.Contains(c.NumberOfSize)));
                }
                else
                {
                    allProducts = allProducts.Where(pr => pr.Sizes.Any(c => c.NumberOfSize == searchSizes[0]));
                }
                if (!allProducts.Any())
                {
                    return null;
                }
            }
            if (!string.IsNullOrEmpty(fromPrice))
            {
                allProducts = allProducts.Where(tr => tr.PriceProduct >= double.Parse(fromPrice));
            }
            if (!string.IsNullOrEmpty(toPrice))
            {
                allProducts = allProducts.Where(tr => tr.PriceProduct <= double.Parse(toPrice));
            }
            if (!string.IsNullOrEmpty(sort))
            {
                switch (sort)
                {
                    case "lowest-price":
                        allProducts = allProducts.OrderByDescending(pro => pro.PriceProduct);
                        break;
                    case "highest-price":
                        allProducts = allProducts.OrderBy(pro => pro.PriceProduct);
                        break;

                    case "earliest-product-create":
                        allProducts = allProducts.OrderByDescending(pro => pro.CreatedDate);
                        break;

                }
            }
            var result = allProducts.Select(product => new Product
            {
                Id = product.Id,
                NameProduct = product.NameProduct,
                PriceProduct = product.PriceProduct,
                ImagesProduct = product.ImagesProduct,
                Colors = product.Colors, 
                Sizes = product.Sizes,
                Category = product.Category,
                CreatedDate = product.CreatedDate,
            });

            return result.ToList();
        }

        public async Task<IEnumerable<Product>> GetProductByIdForUser(Guid Id)
        {
            var product = await db.Products
                .Where(p => p.Id == Id)
                .Include(p => p.Category)
                .Include(p => p.Colors)
                .Include(p => p.Sizes)
                .Select(p => new Product()
                {
                    Id = p.Id,
                    NameProduct = p.NameProduct,
                    PriceProduct = p.PriceProduct,
                    ImagesProduct = p.ImagesProduct,
                    Colors = p.Colors,
                    Sizes = p.Sizes,
                    Category = new Category()
                    {
                        Id = p.Category.Id,
                        Name = p.Category.Name,
                    }
                })
                .FirstOrDefaultAsync();

            // Trả về một mảng chứa `product`, nếu `product` là `null` thì trả về mảng rỗng.
            return product != null ? new[] { product } : Enumerable.Empty<Product>();
        }

        public List<Product> GetEightProduct(string? sort, int page = 1)
        {
            var allProducts = db.Products.Include(ca => ca.Category).Include(c => c.Colors).Include(s => s.Sizes).AsQueryable();
            if (!string.IsNullOrEmpty(sort))
            {
                switch (sort)
                {
                   
                    case "earliest-product-create":
                        allProducts = allProducts.OrderByDescending(pro => pro.CreatedDate);
                        break;
                }
            }
            allProducts = allProducts.Skip((page - 1) * PAGE_SIZE_EIGHT_PRODUCTS).Take(PAGE_SIZE_EIGHT_PRODUCTS);
            var result = allProducts.Select(product => new Product
            {
                Id = product.Id,
                NameProduct = product.NameProduct,
                PriceProduct = product.PriceProduct,
                ImagesProduct = product.ImagesProduct,
                Colors = product.Colors,
                Sizes = product.Sizes,
                Category = product.Category,
                CreatedDate = product.CreatedDate,
            });

            return result.ToList();
        }
    }



}
