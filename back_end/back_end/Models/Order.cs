namespace back_end.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public int TotalAmount { get; set; }
        public DateTime OrderDate { get; set; }
        public User ?User { get; set; }
        public ICollection<OrderDetail>? OrderDetails { get; set; }
        public Order()
        {
            Id = Guid.NewGuid();
        }

    }
}
