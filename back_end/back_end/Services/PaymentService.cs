using back_end.IRepository;
using back_end.Models;
using Microsoft.EntityFrameworkCore;
using Mysqlx.Crud;

namespace back_end.Services
{
    public class PaymentService : IPaymentRepo
    {
        private readonly ApplicationDbContext db;

        public PaymentService(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task<bool> CreatePayment(Payment payemt)
        {
            User user = await db.Users.FirstOrDefaultAsync(u => u.Id == payemt.UserId);
            if (user == null)
            {
                Console.WriteLine("User không tồn tại");
                return false;
            }
            payemt.User = user;
            await db.Payments.AddAsync(payemt);
            await db.SaveChangesAsync();
            return true;
        }

        public async Task<Payment> DeletePayment(Guid Id)
        {
            var delPayment = await db.Payments.SingleOrDefaultAsync(x => x.Id == Id);
            if (delPayment != null)
            {
                db.Payments.Remove(delPayment);
                int result = await db.SaveChangesAsync();
                if (result == 0)
                {
                    return null;
                }
                else
                {
                    return delPayment;
                }
            }
            return null;
        }

        public async Task<IEnumerable<Payment>> GetPaymentsByUserId(Guid userId)
        {
            /* var payments = await db.Payments.Where(p=>p.UserId == userId).Select(p => new Payment
             {
                 Id = p.Id,
                 NameUser   = p.NameUser,
                 PhoneUser = p.PhoneUser,
                 AddressUser = p.AddressUser,
                 NoteUser = p.NoteUser, 
                 TotalAmountOfOrder = p.TotalAmountOfOrder,
                 UserId = p.UserId

             }).ToListAsync();
             return (payments ?? new List<Payment>());*/
            var payments = await db.Payments
                            .Where(p => p.UserId == userId).Include(p=>p.User.Orders).ThenInclude(o=>o.ProductOrders).ThenInclude(po => po.Product).ToListAsync();
            return payments ?? new List<Payment>();
        }
    }
}
