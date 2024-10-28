namespace back_end.Models
{
    public class ProductColor
    {
        public int Id { get; set; }
        public int ColorId { get; set; }
        public Guid ProductId { get; set; }
    }
}
