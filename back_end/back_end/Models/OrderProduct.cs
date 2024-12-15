namespace back_end.Models
{
    public class OrderProduct
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public int TotalAmount {  get; set; }   
        public DateTime CreatedDate { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
        public OrderProduct()
        {
            Id = Guid.NewGuid(); // Tạo UUID tự động khi khởi tạo
            CreatedDate = DateTime.Now;
        }

    }
}
