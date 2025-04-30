using back_end.Models;

namespace back_end.IRepository
{
    public interface ICommentRepo
    {
        Task<IEnumerable<Comment>> GetCommentByProductId(Guid ProductId);
        Task<bool> CreateComment(Comment comment);
        Task<bool> PutComment(Guid Id, Comment Comment);
        Task<Comment> DeleteComment(Guid Id);
    }
}
