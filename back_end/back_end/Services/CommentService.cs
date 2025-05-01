using back_end.IRepository;
using back_end.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace back_end.Services
{
    public class CommentService : ICommentRepo
    {
        private readonly ApplicationDbContext db;
        private readonly IHubContext<CommentHub> _hubContext;

        public CommentService(ApplicationDbContext db, IHubContext<CommentHub> hubContext)
        {
            this.db = db;
            _hubContext = hubContext;
        }

        public async Task<bool> CreateComment(Comment comment)
        {
            try
            {
                User user = db.Users.Where(c => c.Id == comment.UserId).FirstOrDefault();
                comment.User = user;

                Product product = db.Products.Where(c => c.Id == comment.ProductId).FirstOrDefault();
                comment.Product = product;

                await db.Comments.AddAsync(comment);
                await db.SaveChangesAsync();
                await _hubContext.Clients.All.SendAsync("ReceiveComment", new
                {
                    comment.Id,
                    comment.ProductId,
                    comment.UserId,
                    comment.Message,
                    comment.CreatedAt
                });
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<Comment> DeleteComment(Guid Id)
        {
            var ExistingComment = await db.Comments.SingleOrDefaultAsync(c => c.Id == Id);
            if (ExistingComment != null)
            {
                db.Comments.Remove(ExistingComment);
                await db.SaveChangesAsync();
                await _hubContext.Clients.All.SendAsync("DeleteComment", ExistingComment.Id);
                return ExistingComment;
            }
            return null;
        }

        public async Task<IEnumerable<Comment>> GetCommentByProductId(Guid productId)
        {
            var comments = await db.Comments
                .Where(c => c.ProductId == productId)
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();
            return comments;
        }

        public async Task<bool> PutComment(Guid Id, Comment Comment)
        {
            var ExistingComment = await db.Comments.FindAsync(Id);
            if (ExistingComment != null)
            {
                ExistingComment.Message = Comment.Message;
                await db.SaveChangesAsync();
                await _hubContext.Clients.All.SendAsync("UpdateComment", new
                {
                    ExistingComment.Id,
                    ExistingComment.ProductId,
                    ExistingComment.UserId,
                    ExistingComment.Message,
                    ExistingComment.CreatedAt
                });
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
   /* .Include(c => c.User) // rất quan trọng để truy cập tên user*/