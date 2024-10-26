﻿namespace back_end.Models
{
    public class Product
    {
        public Guid Id { get; private set; }
        public string NameProduct { get; set; }
        public string PriceProduct { get; set; }
        public string SizeProduct { get; set; }

        public Product()
        {
            Id = Guid.NewGuid(); // Tạo UUID tự động khi khởi tạo
        }

    }
}
