using back_end.IRepository;
using back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end.Services
{
    public class SizeService : ISizeRepo
    {
        private readonly ApplicationDbContext db;
        public SizeService(ApplicationDbContext db)
        {
            this.db = db;
        }

        public  async Task<bool> CreateSize(Size si)
        {
            db.Sizes.Add(si);
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

        public async Task<Size> DeleteSize(int Id)
        {
            var delSize = await db.Sizes.SingleOrDefaultAsync(x => x.Id == Id);
            if (delSize != null)
            {
                db.Sizes.Remove(delSize);
                int result = await db.SaveChangesAsync();
                if (result == 0)
                {
                    return null;
                }
                else
                {
                    return delSize;
                }
            }
            return null;
        }

        public async Task<IEnumerable<Size>> GetAllSize()
        {
            return await db.Sizes.ToListAsync();
        }

        public async Task<IEnumerable<Size>> GetSizeById(int Id)
        {
            return await db.Sizes.Where(cl => cl.Id == Id).ToListAsync();
        }

        public async Task<bool> PutSize(int Id, Size si)
        {
            var oldSize = await db.Sizes.FindAsync(Id);
            if (oldSize != null)
            {
                oldSize.NumberOfSize = si.NumberOfSize;
                await db.SaveChangesAsync();
                return true;
            }
            else { return false; }
        }
    }
}
