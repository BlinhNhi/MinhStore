using back_end.IRepository;
using back_end.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

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

        public async Task<bool> CreateOrder(Order order)
        {
            try
            {
                User user = await db.Users.Where(u => u.Id == order.UserId).FirstOrDefaultAsync();
                order.User = user;
                Color color = await db.Colors.Where(c => c.Id == order.ColorId).FirstOrDefaultAsync();
                if (color == null) return false; // Trả về false nếu Color không tồn tại
                order.Color = color;
                Size size = await db.Sizes.Where(s => s.Id == order.SizeId).FirstOrDefaultAsync();
                if (size == null) return false; // Trả về false nếu Color không tồn tại
                order.Size = size;

                await db.Orders.AddAsync(order);
                await db.SaveChangesAsync();

                if (order.ProductId != null)
                {
                    /*List<Guid> list = order.ProductId.ToString().Split(",").ToList();*/
                    List<Guid> productIds = order.ProductId
                    .ToString() // Chuyển sang string nếu chưa là string
                    .Split(",") // Tách các phần tử dựa trên dấu phẩy
                    .Select(id => Guid.Parse(id)) // Chuyển từng phần tử thành Guid
                    .ToList();
                    for (int i = 0; i < productIds.Count; i++)
                    {
                        Guid id = productIds[i];
                        OrderProduct product = new OrderProduct { OrderId = order.Id, ProductId = id };
                        db.OrderProducts.Add(product);
                        await db.SaveChangesAsync();
                    }
                }

                return true;
            }catch (Exception ex)
            {
                return false;

            }
        }

        public Task<Order> DeleteOrder(Guid Id)
        {
            throw new NotImplementedException();
        }

        public  async Task<IEnumerable<Order>> GetAllOrder()
        {
           return await db.Orders
                .Include(o=>o.Color)
                .Include(o=>o.Size).
                Include(o=>o.Products)
                .Select(o=> new Order()
                {
                    Id = o.Id,
                    QuantityOrder = o.QuantityOrder,
                    TotalAmount = o.TotalAmount,
                    Size = o.Size,
                    Color = o.Color,
                    Products = o.ProductOrders.Select(po => new Product
                    {
                        Id = po.Product.Id,
                        NameProduct = po.Product.NameProduct,
                        PriceProduct = po.Product.PriceProduct,
                    }).ToList(),
                    UserId = o.UserId,
                    User=new User()
                    {
                        Email = o.User.Email,
                        Name = o.User.Name,
                        Phone = o.User.Phone,
                    },
                    OrderDate = o.OrderDate,
                })
                .ToListAsync();
        }

        public Task<bool> PutOrder(Guid Id, Order order)
        {
            throw new NotImplementedException();
        }
    }
}
