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

        [HttpGet]
        public async Task<ActionResult> GetAllOrder()
        {
            try
            {
                var list = await repo.GetAllOrder();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Order>>(StatusCodes.Status200OK, "Get List Of Order Successfully", list, null);
                    return Ok(response);
                }
                return BadRequest();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpPost]
        public async Task<ActionResult> CreateOrder([FromForm] Order order)
        {
            try
            {
                bool list = await repo.CreateOrder(order);
                if (list == true)
                {
                    var response = new ResponseData<Order>(StatusCodes.Status200OK, "Create new Order Successfully", order, null);
                    return Ok(response);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
