using back_end.Models;

namespace back_end.IRepository
{
    public interface IPaymentRepo
    {
        Task<Payment> CreatePayment(Payment payment);
        Task<IEnumerable<Order>> GetOrdersByUserId(Guid userId);

    }
}
