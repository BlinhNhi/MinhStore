using back_end.IRepository;
using back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end.Services
{
    public class OrderService : IOrderRepo
    {
        private readonly ApplicationDbContext db;
        private readonly IWebHostEnvironment env;
        public OrderService(ApplicationDbContext db, IWebHostEnvironment env)
        {
            this.db = db;
            this.env = env;
        }

        public async Task<IEnumerable<Order>> GetAllOrder()
        {
            return await db.Orders
                .Include(o=>o.OrderDetails)
                .Include(o=>o.User)
                .Select(o=> new Order()
                {
                    Id = o.Id,
                    OrderDetails = o.OrderDetails,
                    UserId = o.UserId,  
                    TotalAmount = o.TotalAmount,
                    OrderDate = o.OrderDate,
                }).ToListAsync();
        }
        public async Task<bool> CreateOrder(Order order)
        {
            try
            {
                // Kiểm tra người dùng có tồn tại không
                var user = await db.Users.FindAsync(order.UserId);
                if (user == null)
                {
                    throw new Exception("User not found.");
                }

                // Thêm Order vào database
                order.OrderDate = DateTime.UtcNow; // Gán ngày tạo
                db.Orders.Add(order);

                // Thêm các OrderDetail nếu có
              /*  if (order.OrderDetails != null && order.OrderDetails.Any())
                {
                    foreach (var detail in order.OrderDetails)
                    {
                        detail.OrderId = order.Id; // Liên kết với Order
                        db.OrderDetails.Add(detail);
                    }
                }*/

                // Lưu thay đổi
                await db.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message); // Ghi log lỗi (tùy chọn)
                return false;
            }
        }

        public Task<Order> DeleteOrder(Guid Id)
        {
            throw new NotImplementedException();
        }



        public Task<bool> PutOrderl(Guid Id, Order order)
        {
            throw new NotImplementedException();
        }
    }
}
