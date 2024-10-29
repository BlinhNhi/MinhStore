using back_end.IRepository;
using back_end.Models;
using back_end.ReponseData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SizeController : ControllerBase
    {
        private readonly ISizeRepo repo;

        public SizeController(ISizeRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllSize()
        {
            try
            {
                var list = await repo.GetAllSize();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Size>>(StatusCodes.Status200OK, "Get List Of Size Successfully", list, null);
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
        public async Task<ActionResult> GetSizeById(int Id)
        {
            try
            {
                var list = await repo.GetSizeById(Id);
                if (list.Count() > 0)
                {
                    var response = new ResponseData<IEnumerable<Size>>(StatusCodes.Status200OK, "Get Size successfully", list, null);
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
        public async Task<ActionResult> CreateSize([FromForm] Size s)
        {
            try
            {
                bool list = await repo.CreateSize(s);
                if (list == true)
                {
                    var response = new ResponseData<Size>(StatusCodes.Status200OK, "Create new Size Successfully", s, null);
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
        public async Task<ActionResult> DeleteSize(int Id)
        {
            try
            {
                var list = await repo.DeleteSize(Id);
                if (list != null)
                {
                    var response = new ResponseData<Size>(StatusCodes.Status200OK, "Delete Size Successfully", list, null);
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
        public async Task<ActionResult> PutSize(int Id, [FromForm] Size s)
        {
            try
            {
                bool list = await repo.PutSize(Id, s);
                if (list == true)
                {
                    var response = new ResponseData<Size>(StatusCodes.Status200OK, "Update Size Successfully ", s, null);
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
