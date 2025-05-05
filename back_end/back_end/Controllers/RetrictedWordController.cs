using back_end.IRepository;
using back_end.Models;
using back_end.ReponseData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetrictedWordController : ControllerBase
    {
        private readonly IRestrictedWord repo;

        public RetrictedWordController(IRestrictedWord repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllRestrictedWords()
        {
            try
            {
                var list = await repo.GetAllRestrictedWords();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<RestrictedWords>>(StatusCodes.Status200OK, "Get List Of Restricted Words Successfully", list, null);
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
        public async Task<ActionResult> GetRestrictedWordById(int Id)
        {
            try
            {
                var list = await repo.GetRestrictedWordsById(Id);
                if (list.Count() > 0)
                {
                    var response = new ResponseData<IEnumerable<RestrictedWords>>(StatusCodes.Status200OK, "Get Restricted Words successfully", list, null);
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
        public async Task<ActionResult> CreateRestrictedWord([FromForm] RestrictedWords restrictedWords)
        {
            try
            {
                bool list = await repo.CreateRestrictedWords(restrictedWords);
                if (list == true)
                {
                    var response = new ResponseData<RestrictedWords>(StatusCodes.Status200OK, "Create new Restricted Words Successfully", restrictedWords, null);
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
        public async Task<ActionResult> DeleteRestrictedWord(int Id)
        {
            try
            {
                var list = await repo.DeleteRestrictedWords(Id);
                if (list != null)
                {
                    var response = new ResponseData<RestrictedWords>(StatusCodes.Status200OK, "Delete Restricte dWords Successfully", list, null);
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
        public async Task<ActionResult> PutRestrictedWords(int Id, [FromForm] RestrictedWords restrictedWords)
        {
            try
            {
                bool list = await repo.PutRestrictedWords(Id, restrictedWords);
                if (list == true)
                {
                    var response = new ResponseData<RestrictedWords>(StatusCodes.Status200OK, "Update Restricted Words Successfully ", restrictedWords, null);
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
