using back_end.IRepository;
using back_end.Models;
using Microsoft.EntityFrameworkCore;

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
            return await db.Product.ToListAsync();
        }

        public async Task<bool> CreateProduct(Product product)
        {
            db.Product.Add(product);
            await db.SaveChangesAsync();
            return true;
        }
        public Task<IEnumerable<Product>> GetProductById(int Id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> PutProduct(int Id, Product product)
        {
            throw new NotImplementedException();
        }
    }
}
