using back_end.IRepository;
using back_end.Models;
using back_end.ReponseData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepo repo;

        public CategoryController(ICategoryRepo repo)
        {
            this.repo = repo;
        }

        /*[Authorize(Roles = "User")]*/
        [HttpGet]
        public async Task<ActionResult> GetAllCate()
        {
            try
            {
                var list = await repo.GetAllCategory();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Category>>(StatusCodes.Status200OK, "Get List Of Category Successfully", list, null);
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
        public async Task<ActionResult> GetCateById(int Id)
        {
            try
            {
                var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
                Console.WriteLine($"User role: {userRole}"); // Log để kiểm tra
                var list = await repo.GetCategoryById(Id);
                if (list.Count() > 0)
                {
                    var response = new ResponseData<IEnumerable<Category>>(StatusCodes.Status200OK, "Get Category successfully", list, null);
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
        public async Task<ActionResult> CreateCate([FromForm] Category category)
        {
            try
            {
                bool list = await repo.CreateCategory(category);
                if (list == true)
                {
                    var response = new ResponseData<Category>(StatusCodes.Status200OK, "Create new Category Successfully", category, null);
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
        public async Task<ActionResult> DeleteCate(int Id)
        {
            try
            {
                var list = await repo.DeleteCategory(Id);
                if (list != null)
                {
                    var response = new ResponseData<Category>(StatusCodes.Status200OK, "Delete Category Successfully", list, null);
                    return Ok(response);
                }
                else { return BadRequest(); }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> PutCate(int Id, [FromForm] Category category)
        {
            try
            {
                bool list = await repo.PutCategory(Id, category);
                if (list == true)
                {
                    var response = new ResponseData<Category>(StatusCodes.Status200OK, "Update Category Successfully ", category, null);
                    return Ok(response);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
