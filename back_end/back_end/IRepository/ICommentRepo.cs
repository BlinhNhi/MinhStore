using back_end.Models;

namespace back_end.IRepository
{
    public interface ICommentRepo
    {
        Task<IEnumerable<Comment>> GetCommentByProductId(Guid ProductId);
    }
}
