using back_end.IRepository;
using back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end.Services
{
    public class PaymentService : IPaymentRepo
    {
        private readonly ApplicationDbContext db;

        public PaymentService(ApplicationDbContext db)
        {
            this.db = db;
        }
        public async Task<bool> CreatePayment(Payment payment)
        {
           /* // Lấy danh sách Order của User
            var orders = await GetOrdersByUserId(payment.UserId);
            if (orders != null)
            {
                foreach (var order in orders)
                {
                    order.PaymentId = payment.Id; // Gán PaymentId cho từng Order
                }
            }
*/
            // Thêm Payment vào DbContext
            db.Payments.Add(payment);
            await db.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<Order>> GetOrdersByUserId(Guid userId)
        {
            var orders = await db.Orders.Where(o => o.UserId == userId).ToListAsync();
            return orders;
        }
    }
}
