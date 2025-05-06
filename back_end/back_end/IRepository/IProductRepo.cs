using back_end.Models;

namespace back_end.IRepository
{
    public interface IProductRepo
    {
        Task<IEnumerable<Product>> GetAllProduct();
        Task<bool> CreateProduct(Product product);
        Task<bool> PutProduct(Guid Id, Product product);
        Task<bool> UpdateQuantityProduct(Guid Id, Product product);
        Task<Product> DeleteProduct(Guid Id);
        Task<IEnumerable<Product>> GetProductByIdForUser(Guid Id);
        Task<IEnumerable<Product>> GetProductById(Guid Id);
        (List<Product> Products, int countProducts) OptionsAsDesired(string? searchName,string? searchCategory,string? searchColor, string? searchSize, string? fromPrice, string? toPrice, string? sort, string? createDay,int page = 1);
        (List<Product> Products, int TotalCount) GetEightProduct(string? sort, int page = 1);


    }
}
