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
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepo repo;

        public CommentController(ICommentRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet("by-product/{productId}")]
        public async Task<IActionResult> GetCommentByProductId(Guid productId)
        {
            var comments = await repo.GetCommentByProductId(productId);
            return Ok(comments);
        }
        [HttpPost]
        public async Task<ActionResult> CreateComment([FromForm] Comment Comment)
        {
            try
            {
                var list = await repo.CreateComment(Comment);
                if (list == true)
                {
                    var response = new ResponseData<Comment>(StatusCodes.Status200OK, "Create comment successfully", Comment, null);
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
        public async Task<ActionResult> DeleteComment(Guid Id)
        {
            try
            {
                var list = await repo.DeleteComment(Id);
                if (list != null)
                {
                    var response = new ResponseData<Comment>(StatusCodes.Status200OK, "Delete comment successfully", list, null);
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
        public async Task<ActionResult> PutComment(Guid Id, [FromForm] Comment comment)
        {
            try
            {
                bool list = await repo.PutComment(Id, comment);
                if (list == true)
                {
                    var response = new ResponseData<Comment>(StatusCodes.Status200OK, "Update comment successfully", comment, null);
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
