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
        public async Task<ActionResult> CreatePayment([FromForm] Payment payment)
        {
            try
            {
                var list = await repo.CreatePayment(payment);
                if (list == true)
                {
                    var response = new ResponseData<Payment>(StatusCodes.Status200OK, "Create new Payment successfully", payment, null);
                    return Ok(response);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult> GetPaymentByUserId(Guid userId)
        {
            try
            {
                var list = await repo.GetPaymentsByUserId(userId);
                if (list.Count() > 0)
                {
                    var response = new ResponseData<IEnumerable<Payment>>(StatusCodes.Status200OK, "Get Payment By User Id successfully", list, null);
                    return Ok(response);
                }
                var responseNoPayment = new ResponseData<IEnumerable<Payment>>(StatusCodes.Status200OK, "No Payment", list, null);
                return Ok(responseNoPayment);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeletePayment(Guid Id)
        {
            try
            {
                var list = await repo.DeletePayment(Id);
                if (list != null)
                {
                    var response = new ResponseData<Payment>(StatusCodes.Status200OK, "Delete Payment Successfully", list, null);
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
