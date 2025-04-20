namespace back_end.Models
{
    public class Comment
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Quan hệ với Product
        public Guid ProductId { get; set; }
        public Product Product { get; set; }

        // Quan hệ với User
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
