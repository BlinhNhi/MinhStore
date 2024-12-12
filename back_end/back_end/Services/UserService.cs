using back_end.IRepository;
using back_end.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace back_end.Services
{
	public class UserService : IUserRepo
	{
        private readonly ApplicationDbContext db;
        private readonly IWebHostEnvironment env;
        public UserService(ApplicationDbContext db, IWebHostEnvironment env)
		{
            this.db = db;
            this.env = env;
		}

        public async Task<bool> CreateUser(User User)
        {
            var ExistingUser = await db.Users.SingleOrDefaultAsync(b => b.Email == User.Email);
            if (ExistingUser == null)
            {
                User.Password = BCrypt.Net.BCrypt.HashPassword(User.Password);
                db.Users.Add(User);
                int result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    return true;
                }
            }
            return false;
        }

        public async Task<User> DeleteUser(Guid Id)
        {
            var ExistingUser = await db.Users.SingleOrDefaultAsync(b => b.Id == Id);
            if (ExistingUser != null)
            {

                db.Users.Remove(ExistingUser);
                int result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    return ExistingUser;
                }
            }
            return null;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await db.Users.ToListAsync();
        }

      
        public async Task<IEnumerable<User>> GetAllUser()
        {
            return await db.Users.Where(b => b.Role == "User").ToListAsync();
        }

        public async Task<IEnumerable<User>> GetUserById(Guid Id)
        {
            return await db.Users.Where(b => b.Id == Id).ToListAsync();
        }

        public async Task<bool> PutUser(Guid Id, User User)
        {
            var ExistingUser = await db.Users.SingleOrDefaultAsync(b => b.Id == Id);
            if (ExistingUser != null)
            {
                ExistingUser.Email = User.Email;
                ExistingUser.Name = User.Name;
                if (User.Password != null && User.Password != "null")
                {
                    ExistingUser.Password = BCrypt.Net.BCrypt.HashPassword(User.Password);
                }
                ExistingUser.Phone = User.Phone;

                int Result = await db.SaveChangesAsync();
                if (Result > 0)
                {
                    return true;
                }

            }
            return false;
        }
    }
    
}

