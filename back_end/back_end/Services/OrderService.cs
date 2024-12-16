using back_end.IRepository;
using back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end.Services
{
    public class OrderService 
    {
        private readonly ApplicationDbContext db;
        private readonly IWebHostEnvironment env;
        public OrderService(ApplicationDbContext db, IWebHostEnvironment env)
        {
            this.db = db;
            this.env = env;
        }

  
    }
}
