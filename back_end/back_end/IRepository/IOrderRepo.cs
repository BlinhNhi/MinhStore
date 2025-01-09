using back_end.Models;

namespace back_end.IRepository
{
    public interface IOrderRepo
    {
        Task<IEnumerable<Order>> GetAllOrder();
        Task<IEnumerable<Order>> GetOrderByUserId(Guid userId);
        /*(List<Order> Orders, bool isDeleted) GetOrderByUserId(Guid userId);*/
        Task<IEnumerable<Order>> GetOrderById(Guid Id);

        Task<bool> CreateOrder(Order order);
        Task<bool> PutOrder(Guid Id, Order order);
        /* (List<Order> Orders, bool isDeleted) UpdateOrderUserId(Guid userId);*/
        Task<bool> UpdateOrderUserId(Guid userId);

        Task<Order> DeleteOrder(Guid Id);

       
    }
}
