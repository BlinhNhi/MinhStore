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
                /* List<Guid> orderIds = payment.OrderId
                     .ToString()
                     .Split(",") // Tách theo dấu phẩy
                     .Select(id => Guid.Parse(id.Trim())) // Chuyển thành Guid
                     .ToList();*/
                List<Guid> orderIds = payment.OrderId
                     .Split(',') // Tách theo dấu phẩy
                     .Select(id => id.Trim().Replace("\"", ""))
                     .Where(id => Guid.TryParse(id, out _))
                     .Select(Guid.Parse)
                     .ToList();

                // Thêm từng sản phẩm vào OrderProducts
                foreach (var id in orderIds)
                {
                    db.PaymentOrders.Add(new PaymentOrder
                    {
                        PaymentId = payment.Id,
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
                    Orders = pay.Orders.Select(or => new Order
                    {
                        Id = or.Id,
                        QuantityOrder = or.QuantityOrder,
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

        public async Task<IEnumerable<Payment>> GetPaymentById(Guid Id)
        {
            /* return await db.Payments.Include(pay => pay.Orders).Where(p => p.Id == Id).ToListAsync();*/
            var payment = await db.Payments
                .Where(pay => pay.Id == Id)
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
                    
                    Orders = pay.Orders.Select(or => new Order
                    {
                        Id = or.Id,
                        QuantityOrder = or.QuantityOrder,
                        Size = or.Size,
                        Color = or.Color,
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
    }
}
