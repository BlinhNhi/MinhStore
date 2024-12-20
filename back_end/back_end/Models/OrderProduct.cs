namespace back_end.Models
{
    public class OrderProduct
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }
        public Order Order { get; set; }
        public Product Product { get; set; }

        public OrderProduct()
        {
            Id = Guid.NewGuid(); // Tạo UUID tự động khi khởi tạo
        }
    }
}
