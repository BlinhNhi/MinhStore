namespace back_end.Models
{
    public class OrderDetail
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public int QuantityOrder { get; set; }
        public Guid OrderId { get; set; }
        public int SizeId { get; set; }
        public int ColorId { get; set; }
        public Size? Size { get; set; }
        public Color? Color { get; set; }
        public Product? Product { get; set; }
        public Order? Order { get; set; }


        public OrderDetail()
        {
            Id = Guid.NewGuid();
        }
    }
}
