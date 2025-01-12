using back_end.IRepository;
using back_end.Models;
using back_end.ReponseData;
using back_end.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

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
                    var response = new ResponseData<IEnumerable<Order>>(StatusCodes.Status200OK, "Get list of Order successfully", list, null);
                    return Ok(response);
                }
                return BadRequest();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult> GetOrderById(Guid Id)
        {
            try
            {
                var list = await repo.GetOrderById(Id);
                if (list.Count() > 0)
                {
                    var response = new ResponseData<IEnumerable<Order>>(StatusCodes.Status200OK, "Get Order By Id successfully", list, null);
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
        public async Task<ActionResult> GetOrderByUserId(Guid userId)
        {
            try
            {
                var list = await repo.GetOrderByUserId(userId);
                if (list.Count() > 0)
                {
                    var response = new ResponseData<IEnumerable<Order>>(StatusCodes.Status200OK, "Get Order By User Id successfully", list, null);
                    return Ok(response);
                }
                var responseNoOrder = new ResponseData<IEnumerable<Order>>(StatusCodes.Status200OK, "No Order", list, null);
                return Ok(responseNoOrder);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }




        /*        [HttpGet("user/{userId}")]
                public IActionResult GetOrderByUserId(Guid userId)
                {
                    try
                    {
                        var (orders, isDeleted) =  repo.GetOrderByUserId(userId);
                        if (orders.Count > 0)
                        {
                            var result = new
                            {
                                Status = StatusCodes.Status200OK,
                                Message = "Get Order By User Id successfully",
                                Data = orders,
                                isDelete = isDeleted
                            };
                            return Ok(result);
                        }
                        var responseNoOrder = new ResponseData<IEnumerable<Order>>(StatusCodes.Status200OK, "No Order", orders, null);
                        return Ok(responseNoOrder);
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);
                    }
                }*/
        [HttpPost]
        public async Task<ActionResult> CreateOrder([FromForm] Order order)
        {
            try
            {
                var list = await repo.CreateOrder(order);
                if (list == true)
                {
                    var response = new ResponseData<Order>(StatusCodes.Status200OK, "Create new Order successfully", order, null);
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
        public async Task<ActionResult> DeleteOrder(Guid Id)
        {
            try
            {
                var list = await repo.DeleteOrder(Id);
                if (list != null)
                {
                    var response = new ResponseData<Order>(StatusCodes.Status200OK, "Delete Order successfully", list, null);
                    return Ok(response);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> PutOrder(Guid Id, [FromForm] Order order)
        {
            try
            {
                bool list = await repo.PutOrder(Id, order);
                if (list)
                {
                    var response = new ResponseData<Order>(StatusCodes.Status200OK, "Edit Order Successfully", order, null);
                    return Ok(response);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut("update-isDelete/{userId}")]
        public async Task<ActionResult> PutOrderByUserId(Guid userId)
        {
            try
            {
                var isSuccess = await repo.UpdateOrderUserId(userId);
                if (!isSuccess)
                {
                    return NotFound(new { message = "No orders found for the given userId." });
                }

                return Ok(new
                {
                    status = 200,
                    message = "Updated isDelete successfully.",
                    data = new { isDelete = true }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


    }
}
