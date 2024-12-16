namespace back_end.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
        public int QuantityOrder { get; set; }
        public int TotalAmount { get; set; }
        public int SizeId { get; set; }
        public int ColorId { get; set; }
        public User ?User { get; set; }
        public Product? Product { get; set; }
        public Size? Size { get; set; }
        public Color? Color { get; set; }
        public DateTime OrderDate { get; set; }
        public Order()
        {
            Id = Guid.NewGuid();
        }

    }
}
