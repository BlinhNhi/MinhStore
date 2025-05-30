﻿namespace back_end.Models
{
    public class Product
    {
        public Guid Id { get; set; }
        public double PriceProduct { get; set; }
        public string NameProduct { get; set; }

        public int StockQuantity { get; set; }
        public int NumberOfProductSold { get; set; }
        public int NumberOfProductInStock { get; set; }
        public string ?ImagesProduct { get; set; }
        public string? ColorId { get; set; }
        public string? SizeId { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public ICollection<Color>? Colors { get; set; }
        public ICollection<Size>? Sizes { get; set; }
        public ICollection<Order>? Orders { get; set; }
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();

        public DateTime ? CreatedDate { get; set; }

        /*   public DateTime CreatedAt
           { get; set; }
           public DateTime UpdatedAt
           { get; set; }
           public DateTime? DeletedAt { get; set; }*/

        public Product()
        {
            Id = Guid.NewGuid(); 
            CreatedDate = DateTime.Now;
        }

    }
}
