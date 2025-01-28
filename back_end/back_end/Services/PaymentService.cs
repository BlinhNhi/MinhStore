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
            User user = await db.Users.FirstOrDefaultAsync(u => u.Id == payment.UserId);
            if (user == null)
            {
                Console.WriteLine("User không tồn tại");
                return false;
            }
            payment.User = user;
            if (payment.OrderId != null)
            {
                List<Guid> orderIds = payment.OrderId
                    .ToString()
                    .Split(",") // Tách theo dấu phẩy
                    .Select(id => Guid.Parse(id.Trim())) // Chuyển thành Guid
                    .ToList();

                // Thêm từng sản phẩm vào OrderProducts
                foreach (var id in orderIds)
                {
                    db.PaymentOrders.Add(new PaymentOrder
                    {
                        PaymentId = payment.Id ,
                        OrderId = id
                    });
                }
            }
            payment.StatusOrder = 0;
            payment.DayOrder = DateTime.Now;
            await db.Payments.AddAsync(payment);
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
            var payment = await db.Payments
                .Where(pay => pay.UserId == userId)
                .Include(pay => pay.Orders).ThenInclude(o => o.Products)
                .Select(pay => new Payment
                {
                    Id = pay.Id,
                    NameUser = pay.NameUser,
                    PhoneUser = pay.PhoneUser,
                    AddressUser = pay.AddressUser,
                    NoteUser = pay.NoteUser,
                    TotalAmountOfOrder = pay.TotalAmountOfOrder,
                    StatusOrder = pay.StatusOrder,
                    Orders = pay.Orders.Select(or=>new Order
                    {
                        Id=or.Id,
                        Products = or.ProductOrders.Select(po => new Product
                        {
                            Id = po.Product.Id,
                            NameProduct = po.Product.NameProduct,
                            PriceProduct = po.Product.PriceProduct,
                            StockQuantity = po.Product.StockQuantity,
                            NumberOfProductInStock = po.Product.NumberOfProductInStock,
                            NumberOfProductSold = po.Product.NumberOfProductSold,
                            ImagesProduct = po.Product.ImagesProduct,
                        }).ToList(),
                    }).ToList(),
                
                    DayOrder = pay.DayOrder,
                })
                    .ToListAsync();
            return (payment ?? new List<Payment>());
        }
      /*  public async Task<IEnumerable<Payment>> GetPaymentsByUserId(Guid userId)
        {
            var payment = await db.Payments
                .Where(pay => pay.UserId == userId)
                .Include(pay => pay.Orders) // Include Orders
                    .ThenInclude(o => o.Products) // Include Products bên trong Orders
                .Select(pay => new
                {
                    Id = pay.Id,
                    NameUser = pay.NameUser,
                    PhoneUser = pay.PhoneUser,
                    AddressUser = pay.AddressUser,
                    NoteUser = pay.NoteUser,
                    TotalAmountOfOrder = pay.TotalAmountOfOrder,
                    StatusOrder = pay.StatusOrder,
                    DayOrder = pay.DayOrder,
                    Orders = pay.Orders.Select(o => new
                    {
                        OrderId = o.Id,
                        Products = o.Products.Select(p => p.NameProduct).ToList() // Lấy danh sách NameProduct
                    }).ToList()
                })
                .ToListAsync();

            return payment;
        }*/


        /*    public async Task<IEnumerable<Payment>> GetPaymentsByUserId(Guid userId)
            {
                *//* var payments = await db.Payments
                                 .Where(p => p.UserId == userId).Include(p=>p.User.Orders).ThenInclude(o=>o.ProductOrders).ThenInclude(po => po.Product).ToListAsync();
                 return payments ?? new List<Payment>();*//*
                t

            }*/
    }
}
