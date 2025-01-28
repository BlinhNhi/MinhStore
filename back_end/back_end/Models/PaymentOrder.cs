namespace back_end.Models
{
    public class PaymentOrder
    {
        public int Id { get; set; }
        public Guid OrderId { get; set; }
        public Guid PaymentId { get; set; }
        public Order Order { get; set; }

        public Payment Payment { get; set; }

    }
}
