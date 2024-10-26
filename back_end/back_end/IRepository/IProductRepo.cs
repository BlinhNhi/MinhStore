using back_end.Models;

namespace back_end.IRepository
{
    public interface IProductRepo
    {
        Task<IEnumerable<Product>> GetAllProduct();
        Task<IEnumerable<Product>> GetProductById(int Id);
        Task<bool> CreateProduct(Product product);
        Task<bool> PutProduct(int Id, Product product);
    }
}
