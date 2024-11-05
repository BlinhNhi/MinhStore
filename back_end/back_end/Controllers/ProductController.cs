using back_end.IRepository;
using back_end.Models;
using back_end.ReponseData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepo repo;

        public ProductController(IProductRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllProduct()
        {
            try
            {
                var list = await repo.GetAllProduct();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Product>>(StatusCodes.Status200OK, "Get list of product successfully", list, null);
                    return Ok(response);
                }
                return BadRequest();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


       /* [AllowAnonymous]*/
        [HttpGet("{Id}")]
        public async Task<ActionResult> getAProductById(Guid Id)
        {
            try
            {
                var list = await repo.GetProductById(Id);
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Product>>(StatusCodes.Status200OK, "Get Product successfully", list, null);
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
        public async Task<ActionResult> CreateProduct([FromForm] Product product)
        {
            try
            {
                var list = await repo.CreateProduct(product);
                if (list == true)
                {
                    var response = new ResponseData<Product>(StatusCodes.Status200OK, "Create new product successfully", product, null);
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
        public async Task<ActionResult> PutProduct(Guid Id, [FromForm] Product product)
        {
            try
            {
                bool list = await repo.PutProduct(Id, product);
                if (list)
                {
                    var response = new ResponseData<Product>(StatusCodes.Status200OK, "Edit Product Successfully", product, null);
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
        public async Task<ActionResult> DeleteProduct(Guid Id)
        {
            try
            {
                var list = await repo.DeleteProduct(Id);
                if (list != null)
                {
                    var response = new ResponseData<Product>(StatusCodes.Status200OK, "Delete Product successfully", list, null);
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
