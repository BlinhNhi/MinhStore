﻿using back_end.IRepository;
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


    }
}
