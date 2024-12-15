using back_end.IRepository;
using back_end.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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

        public async Task<IEnumerable<User>> GetAllUser()
        {
            return await db.Users.Where(b => b.Role == "User").ToListAsync();
        }


        public string GetTokenUserByGoogleIdAsync(string userId, string email, string secretKey)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim(ClaimTypes.Email, email)
            }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task AddUserAsync(User user)
        {
            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();
        }

        public async Task<User?> GetUserByGoogleIdAsync(string googleId)
        {
            return await db.Users.FirstOrDefaultAsync(u => u.GoogleId == googleId);
        }
    }
    
}

