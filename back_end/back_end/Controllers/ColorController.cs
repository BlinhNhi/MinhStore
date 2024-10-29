using back_end.IRepository;
using back_end.Models;
using back_end.ReponseData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        private readonly IColorRepo repo;

        public ColorController(IColorRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllColor()
        {
            try
            {
                var list = await repo.GetAllColor();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Color>>(StatusCodes.Status200OK, "Get List Of Color Successfully", list, null);
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
        public async Task<ActionResult> GetColorById(int Id)
        {
            try
            {
                var list = await repo.GetColorById(Id);
                if (list.Count() > 0)
                {
                    var response = new ResponseData<IEnumerable<Color>>(StatusCodes.Status200OK, "Get Color successfully", list, null);
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
        public async Task<ActionResult> CreateColor([FromForm] Color color)
        {
            try
            {
                bool list = await repo.CreateColor(color);
                if (list == true)
                {
                    var response = new ResponseData<Color>(StatusCodes.Status200OK, "Create new Color Successfully", color, null);
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
        public async Task<ActionResult> DeleteColor(int Id)
        {
            try
            {
                var list = await repo.DeleteColor(Id);
                if (list != null)
                {
                    var response = new ResponseData<Color>(StatusCodes.Status200OK, "Delete Color Successfully", list, null);
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
        public async Task<ActionResult> PutColor(int Id, [FromForm] Color color)
        {
            try
            {
                bool list = await repo.PutColor(Id, color);
                if (list == true)
                {
                    var response = new ResponseData<Color>(StatusCodes.Status200OK, "Update Color Successfully ", color, null);
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

