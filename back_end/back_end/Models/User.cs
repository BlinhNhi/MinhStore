using System;
namespace back_end.Models
{
	public class User
	{
		public Guid Id { get; set; }

		public string ?GoogleId { get; set; }

        public string ?Name { get; set; }
		public string Email { get; set; }
		public string ?Password { get; set; }
		public string ?Phone { get; set; }
		public string ?Role { get; set; }
		public ICollection<Order>? Orders { get; set; }
		public ICollection<Payment>? Payments { get; set; }
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();


        public User()
        {
            Id = Guid.NewGuid(); // Tạo UUID tự động khi khởi tạo
        }
    }
}

