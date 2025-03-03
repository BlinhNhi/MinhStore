using back_end.IRepository;
using back_end.Models;
using Microsoft.EntityFrameworkCore;
using MySqlX.XDevAPI.Common;
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

        /*  public async Task<bool> CreateOrder(Order order)
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
                  if (order.ProductId != null)
                  {
                      List<Guid> productIds = order.ProductId
                          .ToString()
                          .Split(",")
                          .Select(id => Guid.Parse(id.Trim()))
                          .ToList();
                      foreach (var id in productIds)
                      {
                          db.OrderProducts.Add(new OrderProduct
                          {

                              OrderId = order.Id,
                              ProductId = id
                          });
                      }
                  }
                  order.IsDeleted = false;
                  await db.Orders.AddAsync(order);
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
  */

        public async Task<bool> CreateOrder(Order order)
        {
            using var transaction = await db.Database.BeginTransactionAsync();
            try
            {
                User user = await db.Users.FirstOrDefaultAsync(u => u.Id == order.UserId);
                if (user == null)
                {
                    Console.WriteLine("User không tồn tại");
                    return false;
                }
                order.User = user;

                Color color = await db.Colors.FirstOrDefaultAsync(c => c.Id == order.ColorId);
                if (color == null)
                {
                    Console.WriteLine("Color không tồn tại");
                    return false;
                }
                order.Color = color;

                Size size = await db.Sizes.FirstOrDefaultAsync(s => s.Id == order.SizeId);
                if (size == null)
                {
                    Console.WriteLine("Size không tồn tại");
                    return false;
                }
                order.Size = size;

                if (order.ProductId != null)
                {
                    List<Guid> productIds = order.ProductId
                        .ToString()
                        .Split(",")
                        .Select(id => Guid.Parse(id.Trim()))
                        .ToList();

                    foreach (var id in productIds)
                    {
                        var product = await db.Products.FirstOrDefaultAsync(p => p.Id == id);
                        if (product == null || product.NumberOfProductInStock < 1)
                        {
                            Console.WriteLine($"Sản phẩm {id} không đủ hàng.");
                            await transaction.RollbackAsync();
                            return false;
                        }
                        // Lưu sản phẩm vào đơn hàng
                        db.OrderProducts.Add(new OrderProduct
                        {
                            OrderId = order.Id,
                            ProductId = id
                        });
                    }
                }

                order.IsDeleted = false;
                await db.Orders.AddAsync(order);
                await db.SaveChangesAsync();

                // Commit transaction nếu không có lỗi
                await transaction.CommitAsync();
                return true;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
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
                    IsDeleted = o.IsDeleted,
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
            return (orders ?? new List<Order>()) ;
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

        public async Task<bool> UpdateOrderUserId(Guid userId)
        {
            var orders = db.Orders.Where(o => o.UserId == userId).ToList();
            if (!orders.Any())
            {
                return false;
            }
         
            foreach (var order in orders)
            {
                order.IsDeleted = true;
            }

            await db.SaveChangesAsync();

            return true;
        }

        /* public (List<Order> Orders, bool isDeleted) UpdateOrderUserId(Guid userId)
         {
             var orders = db.Orders
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
                .ToList();


             if (!orders.Any())
             {
                 return (new List<Order>(), false);
             }

             // Cập nhật isDelete là true
             var isDeleted = true;

             // Trả về dữ liệu gồm danh sách đơn hàng và trạng thái isDelete
             return (orders, isDeleted);
         }*/
    }
}
