using back_end.Models;

namespace back_end.IRepository
{
    public interface ICategoryRepo
    {
        Task<IEnumerable<Category>> GetAllCategory();
        Task<IEnumerable<Category>> GetCategoryById(int Id);
        Task<bool> CreateCategory(Category cate);
        Task<bool> PutCategory(int Id, Category cate);
        Task<Category> DeleteCategory(int Id);
    }
}
