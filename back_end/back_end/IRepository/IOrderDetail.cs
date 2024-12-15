using back_end.Models;

namespace back_end.IRepository
{
    public interface IOrderDetailRepo
    {
        Task<IEnumerable<OrderDetail>> GetAllOrderDetail();
        Task<bool> CreateOrderDetail(OrderDetail orderDetail);
        Task<bool> PutOrderDetail(Guid Id, OrderDetail orderDetail);
        Task<Product> DeleteOrderDetail(Guid Id);
    }
}
