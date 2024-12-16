namespace back_end.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string ProductId { get; set; }
        public int QuantityOrder { get; set; }
        public int TotalAmount { get; set; }
        public int SizeId { get; set; }
        public int ColorId { get; set; }
        public User ?User { get; set; }
        public Size? Size { get; set; }
        public Color? Color { get; set; }
        public ICollection<Product>? Products { get; set; }
        public ICollection<OrderProduct> ?ProductOrders { get; set; }
        public DateTime OrderDate { get; set; }

        public Order()
        {
            Id = Guid.NewGuid();
            OrderDate = DateTime.Now;

        }

    }
}
