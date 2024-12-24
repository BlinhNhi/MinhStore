namespace back_end.Models
{
    public class Size
    {
        public int Id { get; set; }
        public string NumberOfSize { get; set; }

        public ICollection<Product>? Products { get; set; }
        public ICollection<Order>? Orders { get; set; }
    }
}
