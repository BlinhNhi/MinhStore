using back_end.Models;

namespace back_end.IRepository
{
    public interface IRestrictedWord
    {
        Task<IEnumerable<RestrictedWords>> GetAllRestrictedWords();
        Task<IEnumerable<RestrictedWords>> GetRestrictedWordsById(int Id);
        Task<bool> CreateRestrictedWords(RestrictedWords restruc);
        Task<bool> PutRestrictedWords(int Id, RestrictedWords restruc);
        Task<RestrictedWords> DeleteRestrictedWords(int Id);
    }
}
