using back_end.IRepository;
using back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end.Services
{
    public class CommentService : ICommentRepo
    {
        private readonly ApplicationDbContext db;

        public CommentService(ApplicationDbContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Comment>> GetCommentByProductId(Guid productId)
        {
            var comments = await db.Comments
                .Where(c => c.ProductId == productId)
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();
            return comments;
        }
    }
}
   /* .Include(c => c.User) // rất quan trọng để truy cập tên user*/