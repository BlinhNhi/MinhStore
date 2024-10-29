using back_end.Models;

namespace back_end.IRepository
{
    public interface IColorRepo
    {
        Task<IEnumerable<Color>> GetAllColor();
        Task<IEnumerable<Color>> GetColorById(int Id);
        Task<bool> CreateColor(Color cl);
        Task<bool> PutColor(int Id, Color cl);
        Task<Color> DeleteColor(int Id);
    }
}
