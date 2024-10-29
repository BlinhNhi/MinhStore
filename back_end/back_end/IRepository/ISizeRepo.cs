using back_end.Models;


namespace back_end.IRepository
{
    public interface ISizeRepo
    {
        Task<IEnumerable<Size>> GetAllSize();
        Task<IEnumerable<Size>> GetSizeById(int Id);
        Task<bool> CreateSize(Size si);
        Task<bool> PutSize(int Id, Size si);
        Task<Size> DeleteSize(int Id);
    }
}
