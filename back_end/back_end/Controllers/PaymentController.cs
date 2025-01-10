using back_end.IRepository;
using back_end.Models;
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
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdPayment = await repo.CreatePaymentAsync(payment);
            return Ok(createdPayment);
        }
    }
}
