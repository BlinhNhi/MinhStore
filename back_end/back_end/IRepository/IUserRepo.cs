using back_end.Models;

namespace back_end.IRepository
{
    public interface IUserRepo
    {
        Task<IEnumerable<User>> GetAll();
        Task<IEnumerable<User>> GetAllUser();
        Task<IEnumerable<User>> GetUserById(Guid Id);
        Task<bool> CreateUser(User User);
        Task<bool> PutUser(Guid Id, User User);
        Task<User> DeleteUser(Guid Id);
       /* Task<User> GetUserByGoogleIdAsync(string googleId);*/
        /*Task AddUserAsync(User user);*/
        /*string GetTokenUserByGoogleIdAsync(string userId, string email, string secretKey);*/

    }
}
