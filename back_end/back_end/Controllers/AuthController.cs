﻿using back_end.IRepository;
using back_end.Models;
using back_end.ReponseData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        private readonly IConfiguration configuration;
        private readonly IUserRepo repo;
        private readonly ISendMail mailRepo;
        private readonly IWebHostEnvironment env;

        public AuthController(ApplicationDbContext db, IConfiguration configuration, IUserRepo repo, ISendMail mailRepo, IWebHostEnvironment env)
        {
            this.db = db;
            this.configuration = configuration;
            this.repo = repo;
            this.mailRepo = mailRepo;
            this.env = env;
        }

        [HttpPost("getinfo")]
        public async Task<ActionResult> GetCurrentUser(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"])),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);
            var jwtToken = (JwtSecurityToken)validatedToken;
            string email = (string)jwtToken.Claims.First(x => x.Type == "Email").Value;
            User user =  db.Users.Where(u => u.Email == email).FirstOrDefault();
            return Ok(user);
        }

        [HttpPost]
        private async Task<User> Authenticate(UserLogin userLogin)
        {
            try
            {
                IEnumerable<User> userList = await db.Users.ToListAsync();
                User list = userList.FirstOrDefault(u => u.Email == userLogin.Email);
                if (list != null)
                {
                    var result = BCrypt.Net.BCrypt.Verify(userLogin.Password, list.Password);
                    if (result == true)
                    {
                        var User = db.Users.FirstOrDefault(u => u.Email == userLogin.Email);
                        return User;
                    }
                    return null;
                }
                return null;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        [NonAction]
        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credential = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim("Email",user.Email),
                new Claim("Password", user.Password),
                new Claim(ClaimTypes.Role,user.Role)

            };
            var token = new JwtSecurityToken(configuration["Jwt:Issuer"], configuration["Jwt:Audience"], claims, expires: DateTime.Now.AddHours(30), signingCredentials: credential);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

/*        [AllowAnonymous]*/
        [HttpPost]
        public async Task<ActionResult> Login([FromBody] UserLogin userLogin)
        {
            var user = await Authenticate(userLogin);
            if (user != null)
            {

                var accessToken = GenerateToken(user);
                var obj = new { user = user, accessToken = accessToken } as object;
                var response = new ResponseData<Object>(StatusCodes.Status200OK, "Login successfully", obj, null);
               
                return Ok(response);
            }
            else
            {
                return BadRequest(new { msg = "Login fail", status = 500 });
            }
        }

        /* [AllowAnonymous]*/
        [HttpPost("register")]
        public async Task<ActionResult> Register(string Email)
        {
            try
            {
                var ExistingUser = await db.Users.SingleOrDefaultAsync(U => U.Email == Email);
                if (ExistingUser == null)
                {
                    var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                    var password = new StringBuilder();
                    for (int i = 0; i < 8; i++)
                    {
                        var index = new Random().Next(characters.Length);
                        password.Append(characters[index]);
                    }
                    string FilePath = Path.Combine(env.ContentRootPath, "EmailTemplate", "register.html");
                    string logoPath = Path.Combine(env.ContentRootPath, "Images", "logo.png");
                    StreamReader str = new StreamReader(FilePath);
                    string MailText = str.ReadToEnd();
                    str.Close();

                    MailText = MailText.Replace("[Logo]", logoPath);
                    MailText = MailText.Replace("[Email]", Email);
                    MailText = MailText.Replace("[Password]", password.ToString());
                    Mail mail = new Mail()
                    {
                        ToEmail = Email,
                        Body = MailText,
                        Subject = "Tài khoản của bạn ở Minh Còi Sneaker đã được tạo!",

                    };
                    await mailRepo.SendEmailAsync(mail);

                    var user = new User
                    {
                        Email = Email,
                        Role = "User",
                        Password = BCrypt.Net.BCrypt.HashPassword(password.ToString())
                    };
                    await db.AddAsync(user);
                    await db.SaveChangesAsync();
                    var accessToken = GenerateToken(user);
                    var obj = new { user = user, accessToken = accessToken } as object;
                    var response = new ResponseData<Object>(StatusCodes.Status200OK, "Register successfully", obj, null);
                    return Ok(response);
                }
                return BadRequest(new ResponseData<Object>(StatusCodes.Status200OK, "Resigter fail", null, "Email already registerd!"));

            }
            catch (Exception ex)
            {
                return Ok(new ResponseData<Object>(StatusCodes.Status200OK, "Resigter fail", null, "Email already registerd!"));
            }
        }

        [AllowAnonymous]
        [HttpPost("ForgetPassword")]
        public async Task<ActionResult> ForgetPassword(string Email)
        {
            try
            {
                User ExistingUser = await db.Users.SingleOrDefaultAsync(p => p.Email == Email);


                if (ExistingUser != null)
                {
                    var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                    var password = new StringBuilder();
                    for (int i = 0; i < 8; i++)
                    {
                        var index = new Random().Next(characters.Length);
                        password.Append(characters[index]);
                    }
                    string FilePath = Path.Combine(env.ContentRootPath, "EmailTemplate", "forgetpassword.html");
                    string logoPath = Path.Combine(env.ContentRootPath, "Images", "logo.png");
                    StreamReader str = new StreamReader(FilePath);
                    string MailText = str.ReadToEnd();
                    str.Close();

                    MailText = MailText.Replace("[Logo]", logoPath);
                    MailText = MailText.Replace("[Email]", Email);
                    MailText = MailText.Replace("[Password]", password.ToString());
                    Mail mail = new Mail()
                    {
                        ToEmail = Email,
                        Body = MailText,
                        Subject = "Yêu cầu đặt lại mật khẩu.",

                    };
                    await mailRepo.SendEmailAsync(mail);
                    ExistingUser.Password = BCrypt.Net.BCrypt.HashPassword(password.ToString());
                    await db.SaveChangesAsync();
                    var response = new ResponseData<string>(StatusCodes.Status200OK, "Foget password successfully", Email, null);
                    return Ok(response);
                }
                return BadRequest(new { msg = "Foget password fail", status = 400 });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
