using back_end.Models;

namespace back_end.IRepository
{
    public interface IPaymentRepo
    {
        Task<bool> CreatePayment(Payment payemt);
        Task<IEnumerable<Payment>> GetPaymentsByUserId(Guid userId);
        Task<Payment> DeletePayment(Guid Id);
        Task<IEnumerable<Payment>> GetPaymentById(Guid Id);
    }
}
