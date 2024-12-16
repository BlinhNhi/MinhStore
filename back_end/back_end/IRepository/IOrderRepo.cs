using back_end.Models;

namespace back_end.IRepository
{
    public interface IOrderRepo
    {
        Task<IEnumerable<Order>> GetAllOrder();
        Task<bool> CreateOrder(Order order);
        Task<bool> PutOrder(Guid Id, Order order);
        Task<Order> DeleteOrder(Guid Id);

       
    }
}
