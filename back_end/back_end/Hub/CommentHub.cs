using back_end.Models;
using Microsoft.AspNetCore.SignalR;

public class CommentHub : Hub
{
    private readonly ApplicationDbContext _context;

    public CommentHub(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task SendComment(string productId, string userId, string message)
    {
        Console.WriteLine($"[SignalR] Received comment - ProductId: {productId}, UserId: {userId}, Message: {message}");

        if (!Guid.TryParse(productId, out Guid pid) || !Guid.TryParse(userId, out Guid uid))
        {
            Console.WriteLine("[SignalR] Failed to parse GUIDs.");
            return;
        }

        var comment = new Comment
        {
            ProductId = pid,
            UserId = uid,
            Message = message,
            CreatedAt = DateTime.UtcNow
        };

        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();

        await Clients.All.SendAsync("ReceiveComment", productId, userId, message, comment.CreatedAt);
    }
}
