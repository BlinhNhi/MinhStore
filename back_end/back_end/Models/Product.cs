namespace back_end.Models
{
    public class Product
    {
        public Guid Id { get; private set; }
        public string PriceProduct { get; set; }
        public string NameProduct { get; set; }

        public int StockQuantity { get; set; }
        public int NumberOfProductSold { get; set; }
        public int NumberOfProductInStock { get; set; }
        public string ?ImageProduct { get; set; }
        public int ColorProduct { get; set; }
        public int SizeProduct { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public ICollection<Color>? Colors { get; set; }
        public ICollection<Size>? Sizes { get; set; }
        public ICollection<OrderDetail>? OrderDetails { get; set; }


        /*   public DateTime CreatedAt
           { get; set; }
           public DateTime UpdatedAt
           { get; set; }
           public DateTime? DeletedAt { get; set; }*/

        public Product()
        {
            Id = Guid.NewGuid(); // Tạo UUID tự động khi khởi tạo
        }

    }
}
