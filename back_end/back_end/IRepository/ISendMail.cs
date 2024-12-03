using back_end.Models;

namespace back_end.IRepository
{
    public interface ISendMail
    {
        Task SendEmailAsync(Mail mailRequest);
    }
}
