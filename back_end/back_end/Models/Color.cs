namespace back_end.Models
{
    public class Color
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Product>? Products { get; set; }
        public ICollection<Order>? Orders { get; set; }
    }
}
