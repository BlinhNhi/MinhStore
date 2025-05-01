using back_end.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

public class CommentHub : Hub
{
    // Broadcast comment mới
    private readonly ApplicationDbContext _context;

    public CommentHub(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task CreateComment(string productId, string userId, string message)
    {
        var comment = new Comment
        {
            Id = Guid.NewGuid(),
            ProductId = Guid.Parse(productId),
            UserId = Guid.Parse(userId),
            Message = message,
            CreatedAt = DateTime.UtcNow
        };

        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();

        await Clients.All.SendAsync("ReceiveComment", new
        {
            comment.Id,
            comment.ProductId,
            comment.UserId,
            comment.Message,
            comment.CreatedAt
        });
    }

    public async Task UpdateComment(string id, string newMessage)
    {
        var cid = Guid.Parse(id);
        var comment = await _context.Comments.FindAsync(cid);
        if (comment != null)
        {
            comment.Message = newMessage;
            await _context.SaveChangesAsync();

            await Clients.All.SendAsync("UpdateComment", new
            {
                comment.Id,
                comment.Message
            });
        }
    }

    public async Task DeleteComment(string id)
    {
        var cid = Guid.Parse(id);
        var comment = await _context.Comments.FindAsync(cid);
        if (comment != null)
        {
            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            await Clients.All.SendAsync("DeleteComment", comment.Id);
        }
    }
}
