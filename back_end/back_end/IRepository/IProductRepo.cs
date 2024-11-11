using back_end.Models;

namespace back_end.IRepository
{
    public interface IProductRepo
    {
        Task<IEnumerable<Product>> GetAllProduct();
        Task<IEnumerable<Product>> GetProductById(Guid Id);
        Task<IEnumerable<Product>> GetProductByIdForUser(Guid Id);

        Task<bool> CreateProduct(Product product);
        Task<bool> PutProduct(Guid Id, Product product);
        Task<Product> DeleteProduct(Guid Id);

        List<Product> OptionsAsDesired(string? searchName,string? searchCategory,string? searchColor, string? searchSize, string? fromPrice, string? toPrice, string? sort, string? createDay);


    }
}
