namespace back_end.Models
{
    public class OrderDetail
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }
        public int QuantityOrder { get; set; }

        public Product? Product { get; set; }
        public Order? Order { get; set; }


        public OrderDetail()
        {
            Id = Guid.NewGuid();
        }
    }
}
