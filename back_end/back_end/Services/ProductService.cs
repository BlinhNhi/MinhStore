using back_end.IRepository;
using back_end.Models;
using Microsoft.EntityFrameworkCore;
using MySqlX.XDevAPI.Common;

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
      

        public async Task<IEnumerable<Product>> GetAllProduct()
        {
            return await db.Products.ToListAsync();
        }

        public async Task<bool> CreateProduct(Product product)
        {
            db.Products.Add(product);
            int result = await db.SaveChangesAsync();
            if (result == 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        public async Task<IEnumerable<Product>> GetProductById(Guid Id)
        {
            return await db.Products.Where(p => p.Id == Id).ToListAsync();
        }

        public async Task<bool> PutProduct(Guid Id, Product product)
        {
            var ExistingProduct = await db.Products.FindAsync(Id);
            if (ExistingProduct != null)
            {
                ExistingProduct.PriceProduct = product.PriceProduct;
                ExistingProduct.NameProduct = product.NameProduct;
                ExistingProduct.StockQuantity = product.StockQuantity;
                ExistingProduct.NumberOfProductSold = product.NumberOfProductSold;
                ExistingProduct.NumberOfProductInStock = product.NumberOfProductInStock;
                /*ExistingProduct.NumberOfProductInStock = product.NumberOfProductInStock;*/
                await db.SaveChangesAsync();
                return true;
            }
            else { return false; }
        }

        public async Task<Product> DeleteProduct(Guid Id)
        {
            var ExistingProduct = await db.Products.SingleOrDefaultAsync(x => x.Id == Id);
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
    }
}
