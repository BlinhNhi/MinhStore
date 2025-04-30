namespace back_end.Models
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid ProductId { get; set; }
        public Product ?Product { get; set; }

        public Guid UserId { get; set; }
        public User ?User { get; set; }

        public Comment()
        {
            Id = Guid.NewGuid();
        }
    }
}
