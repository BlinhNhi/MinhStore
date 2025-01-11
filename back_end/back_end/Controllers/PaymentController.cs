using back_end.IRepository;
using back_end.Models;
using back_end.ReponseData;
using back_end.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentRepo repo;
        private readonly IConfiguration _config;

        public PaymentController(IPaymentRepo repo)
        {
            this.repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody] Payment payment)
        {
            try
            {
                /*bool list = await repo.CreatePayment(payment);*/
              /*  if (list == true)
                {
                    var response = new ResponseData<Payment>(StatusCodes.Status200OK, "Create new Payment Successfully", payment, null);
                    return Ok(response);
                }*/
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
