using back_end.IRepository;
using back_end.Models;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace back_end.Services
{
    public class ColorService : IColorRepo
    {
        private readonly ApplicationDbContext db;
        public ColorService(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task<bool> CreateColor(Color cl)
        {
            db.Colors.Add(cl);
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

        public async Task<Color> DeleteColor(int Id)
        {
            var delColor = await db.Colors.SingleOrDefaultAsync(x => x.Id == Id);
            if (delColor != null)
            {
                db.Colors.Remove(delColor);
                int result = await db.SaveChangesAsync();
                if (result == 0)
                {
                    return null;
                }
                else
                {
                    return delColor;
                }
            }
            return null;
        }

        public async Task<IEnumerable<Color>> GetAllColor()
        {
            return await db.Colors.ToListAsync();
        }

        public async Task<IEnumerable<Color>> GetColorById(int Id)
        {
            return await db.Colors.Where(cl => cl.Id == Id).ToListAsync();
        }

        public async Task<bool> PutColor(int Id, Color cl)
        {
            var oldColor = await db.Colors.FindAsync(Id);
            if (oldColor != null)
            {
                oldColor.Name = cl.Name;
                await db.SaveChangesAsync();
                return true;
            }
            else { return false; }
        }
    }
}
