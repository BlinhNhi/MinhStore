namespace back_end.Models
{
    public class Payment
    {
        public Guid Id { get; set; }
        public string NameUser { get; set; }
        public int PhoneUser { get; set; }
        public string AddressUser { get; set; }
        public string ?NoteUser { get; set; }
        public int TotalAmountOfOrder { get; set; }
        public int StatusOrder { get; set; }
        public DateTime DayOrder { get; set; }
        public Guid UserId { get; set; }
        public User? User { get; set; }
        public string ?OrderId { get; set; }
        public ICollection<Order> ?Orders { get; set; }
        public ICollection<OrderProduct> ?ProductOrders { get; set; }
        public ICollection<PaymentOrder>? PaymentOrders { get; set; }


        public Payment()
        {
            Id = Guid.NewGuid();
        }
    }
}
