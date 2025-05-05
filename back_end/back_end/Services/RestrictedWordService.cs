using back_end.IRepository;
using back_end.Models;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace back_end.Services
{
    public class RestrictedWordService : IRestrictedWord
    {
        private readonly ApplicationDbContext db;

        public RestrictedWordService(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task<bool> CreateRestrictedWords(RestrictedWords restruc)
        {
            db.RestrictedWords.Add(restruc);
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

        public async Task<RestrictedWords> DeleteRestrictedWords(int Id)
        {
            var delRetruc = await db.RestrictedWords.SingleOrDefaultAsync(r => r.Id == Id);
            if (delRetruc != null)
            {
                db.RestrictedWords.Remove(delRetruc);
                int result = await db.SaveChangesAsync();
                if (result == 0)
                {
                    return null;
                }
                else
                {
                    return delRetruc;
                }
            }
            return null;
        }

        public async Task<IEnumerable<RestrictedWords>> GetAllRestrictedWords()
        {
            return await db.RestrictedWords.ToListAsync();
        }

        public async Task<IEnumerable<RestrictedWords>> GetRestrictedWordsById(int Id)
        {
            return await db.RestrictedWords.Where(restr => restr.Id == Id).ToListAsync();
        }

        public async Task<bool> PutRestrictedWords(int Id, RestrictedWords restruc)
        {

            var oldRetruc = await db.RestrictedWords.FindAsync(Id);
            if (oldRetruc != null)
            {
                oldRetruc.Word = restruc.Word;
                await db.SaveChangesAsync();
                return true;
            }
            else { return false; }
        }
    }
}
