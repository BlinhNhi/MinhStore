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
/*
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


                if (order.ProductId != null)
                {
                    *//*List<Guid> list = order.ProductId.ToString().Split(",").ToList();*//*
                    List<Guid> productIds = order.ProductId
                    .ToString() // Chuyển sang string nếu chưa là string
                    .Split(",") // Tách các phần tử dựa trên dấu phẩy
                    .Select(id => Guid.Parse(id)) // Chuyển từng phần tử thành Guid
                    .ToList();
                *//*    for (int i = 0; i < productIds.Count; i++)
                    {
                        Guid id = productIds[i];
                        OrderProduct product = new OrderProduct { OrderId = order.Id, ProductId = id };
                        db.OrderProducts.Add(product);
                        await db.SaveChangesAsync();
                    }*//*
                    foreach (var id in productIds)
                    {
                        OrderProduct product = new OrderProduct
                        {
                            OrderId = order.Id,
                            ProductId = id
                        };
                        order.ProductOrders = product;
                    }
                }
                await db.Orders.AddAsync(order);
                await db.SaveChangesAsync();
                return true;
            }catch (Exception ex)
            {
                return false;

            }
        }*/

        public async Task<bool> CreateOrder(Order order)
        {
            try
            {
                // Kiểm tra User
                User user = await db.Users.FirstOrDefaultAsync(u => u.Id == order.UserId);
                if (user == null)
                {
                    Console.WriteLine("User không tồn tại");
                    return false;
                }
                order.User = user;

                // Kiểm tra Color
                Color color = await db.Colors.FirstOrDefaultAsync(c => c.Id == order.ColorId);
                if (color == null)
                {
                    Console.WriteLine("Color không tồn tại");
                    return false;
                }
                order.Color = color;

                // Kiểm tra Size
                Size size = await db.Sizes.FirstOrDefaultAsync(s => s.Id == order.SizeId);
                if (size == null)
                {
                    Console.WriteLine("Size không tồn tại");
                    return false;
                }
                order.Size = size;

                // Xử lý ProductId nếu không null
                if (order.ProductId != null)
                {
                    // Chuyển ProductId thành List<Guid>
                    List<Guid> productIds = order.ProductId
                        .ToString()
                        .Split(",") // Tách theo dấu phẩy
                        .Select(id => Guid.Parse(id.Trim())) // Chuyển thành Guid
                        .ToList();

                    // Thêm từng sản phẩm vào OrderProducts
                    foreach (var id in productIds)
                    {
                        db.OrderProducts.Add(new OrderProduct
                        {
                            OrderId = order.Id,
                            ProductId = id
                        });
                    }
                }

                // Thêm Order vào database
                await db.Orders.AddAsync(order);

                // Chỉ gọi SaveChanges một lần
                await db.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                // Log lỗi
                Console.WriteLine($"Lỗi khi tạo đơn hàng: {ex.Message}");
                return false;
            }
        }

        public async Task<Order> DeleteOrder(Guid Id)
        {
            var ExistingOrder = await db.Orders.SingleOrDefaultAsync(o => o.Id == Id);
            if (ExistingOrder != null)
            {
                db.Orders.Remove(ExistingOrder);
                int result = await db.SaveChangesAsync();
                if (result == 0)
                {
                    return null;
                }
                else
                {
                    return ExistingOrder;
                }
            }
            return null;
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

        public async Task<IEnumerable<Order>> GetOrderById(Guid Id)
        {
            return await db.Orders.Where(o => o.Id == Id).ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetOrderByUserId(Guid userId)
        {
            var orders = await db.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.Color)
                .Include(o => o.Size)
                .Include(o => o.Products)
                .Select(o => new Order
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
                        StockQuantity = po.Product.StockQuantity,
                        NumberOfProductInStock = po.Product.NumberOfProductInStock,
                        NumberOfProductSold = po.Product.NumberOfProductSold,
                        ImagesProduct = po.Product.ImagesProduct,
                    }).ToList(),
                    UserId = o.UserId,
                    OrderDate = o.OrderDate,
                 })
                    .ToListAsync();
                  return orders ?? new List<Order>();
        }

        public async Task<bool> PutOrder(Guid Id, Order order)
        {
            var ExistingOrder = await db.Orders.SingleOrDefaultAsync(or => or.Id == Id);
            if(ExistingOrder != null)
            {
                ExistingOrder.QuantityOrder = order.QuantityOrder;
                ExistingOrder.TotalAmount = order.TotalAmount;
                await db.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
