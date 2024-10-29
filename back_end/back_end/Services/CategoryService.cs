using back_end.IRepository;
using back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end.Services
{
    public class CategoryService : ICategoryRepo
    {
        private readonly ApplicationDbContext db;

        public CategoryService(ApplicationDbContext db)
        {
            this.db = db;
        }
        public async Task<bool> CreateCategory(Category cate)
        {
            db.Categories.Add(cate);
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

        public async Task<Category> DeleteCategory(int Id)
        {
            var delCate = await db.Categories.SingleOrDefaultAsync(x => x.Id == Id);
            if (delCate != null)
            {
                db.Categories.Remove(delCate);
                int result = await db.SaveChangesAsync();
                if (result == 0)
                {
                    return null;
                }
                else
                {
                    return delCate;
                }
            }
            return null;
        }

        public async Task<IEnumerable<Category>> GetAllCategory()
        {
            return await db.Categories.ToListAsync();
        }

        public async Task<IEnumerable<Category>> GetCategoryById(int Id)
        {
            return await db.Categories.Where(cate => cate.Id == Id).ToListAsync();
        }

        public async Task<bool> PutCategory(int Id, Category cate)
        {
            var oldCate = await db.Categories.FindAsync(Id);
            if (oldCate != null)
            {
                oldCate.Name = cate.Name;
                await db.SaveChangesAsync();
                return true;
            }
            else { return false; }
        }
    }
}
