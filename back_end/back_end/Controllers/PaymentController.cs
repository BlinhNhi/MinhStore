using back_end.IRepository;
using back_end.Models;
using back_end.ReponseData;
using back_end.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentRepo repo;
        private readonly IConfiguration _config;
       /* private readonly IHubContext<PaymentHub> _hubContext;*/

        public PaymentController(IPaymentRepo repo)
        {
            this.repo = repo;
            /*_hubContext = hubContext;*/
        }

        [HttpGet]
        public async Task<ActionResult> GetAllPayment()
        {
            try
            {
                var list = await repo.GetAllPayment();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Payment>>(StatusCodes.Status200OK, "Get list of Payment successfully", list, null);
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

        [HttpGet("{Id}")]
        public async Task<ActionResult> getPaymentById(Guid Id)
        {
            try
            {
                var list = await repo.GetPaymentById(Id);
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Payment>>(StatusCodes.Status200OK, "Get Payment By Id successfully", list, null);
                    return Ok(response);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpPut("updateStatus/{Id}")]
        public async Task<ActionResult> UpdateStatusPayment(Guid Id, [FromForm] Payment payment)
        {
            try
            {
                bool list = await repo.UpdateStatusPayment(Id, payment);
                if (list)
                {
                    /* await _hubContext.Clients.All.SendAsync("ReceiveOrderStatusUpdate", Id.ToString(), payment.StatusOrder);
                     var response = new ResponseData<Payment>(StatusCodes.Status200OK, "Edit Status Payment Successfully", payment, null);*/

                    var response = new ResponseData<Payment>(StatusCodes.Status200OK, "Edit Status Payment Successfully", payment, null);
                    return Ok(response);
                }
                return BadRequest();
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

        [HttpGet("GetMonthlyTotalAmount")]
        public async Task<IActionResult> GetMonthlyTotalAmount(int year)
        {
            try
            {
                var monthlyTotals = await repo.GetMonthlyTotalAmount(year);
                if (monthlyTotals != null)
                {
                    return Ok(monthlyTotals);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetMonthlyCountOrder")]
        public async Task<IActionResult> GetMonthlyCountOrder(int year)
        {
            try
            {
                var monthlyCountOrder = await repo.GetMonthlyCountOrder(year);
                if (monthlyCountOrder != null)
                {
                    return Ok(monthlyCountOrder);
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
