using back_end.IRepository;
using back_end.Models;
using back_end.ReponseData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepo repo;

        public OrderController(IOrderRepo repo)
        {
            this.repo = repo;
        }

     


       
    }
}
