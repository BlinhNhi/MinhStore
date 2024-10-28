namespace back_end.Models
{
    public class ProductSize
    {
        public int Id { get; set; }
        public Guid ProductId { get; set; }
        public int SizeId { get; set; }
    }
}
