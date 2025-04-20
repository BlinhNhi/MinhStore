using back_end.IRepository;
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
    }
}
