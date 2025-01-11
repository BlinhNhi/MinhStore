using System;
using System.IdentityModel.Tokens.Jwt;
using back_end.IRepository;
using back_end.Models;
using back_end.ReponseData;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
	[ApiController]
	[Route("/User")]
	public class UserController  : ControllerBase
	{

        private readonly IUserRepo repo;
        private readonly IConfiguration _config;

        public UserController(IUserRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllUser()
        {
            try
            {
                var list = await repo.GetAllUser();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<User>>(StatusCodes.Status200OK, "Get list of User successfully", list, null);
                    return Ok(response);
                }
                return BadRequest();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("all")]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var list = await repo.GetAll();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<User>>(StatusCodes.Status200OK, "Get list successfully", list, null);
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
        public async Task<ActionResult> GetUserById(Guid Id)
        {
            try
            {
                var list = await repo.GetUserById(Id);
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<User>>(StatusCodes.Status200OK, "Get successfully", list, null);
                    return Ok(response);
                }
                return BadRequest();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("userOrder/{UserId}")]
        public async Task<ActionResult> GetOrderUserByUserId(Guid UserId)
        {
            try
            {
                var list = await repo.GetOrderOfUserByUserId(UserId);
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<User>>(StatusCodes.Status200OK, "Get Order Of User successfully", list, null);
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
        public async Task<ActionResult> CreateUser([FromForm] User User)
        {
            try
            {
                bool list = await repo.CreateUser(User);
                if (list == true)
                {
                    var response = new ResponseData<User>(StatusCodes.Status200OK, "Create new User Successfully", User, null);
                    return Ok(response);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete]
        public async Task<ActionResult> DeleteUser(Guid Id)
        {
            try
            {
                var list = await repo.DeleteUser(Id);

                if (list != null)
                {
                    var response = new ResponseData<User>(StatusCodes.Status200OK, "Delete User Successfully", list, null);
                    return Ok(response);
                }
                else { return BadRequest(); }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> PutUser(Guid Id, [FromForm] User User)
        {
            try
            {
                bool list = await repo.PutUser(Id, User);
                if (list == true)
                {
                    var response = new ResponseData<User>(StatusCodes.Status200OK, "Update User Successfully ", User, null);
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
        
     /*   [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleAuthRequest request)
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(request.IdToken);
            if (payload == null)
            {
                return Unauthorized();
            }

            // Check if user exists in database by Email (no GoogleId field)
            var user = await repo.GetUserByGoogleIdAsync(payload.Email);
            if (user == null)
            {
                user = new User
                {
                    Email = payload.Email,
                    Name = payload.Name,
                };
                await repo.AddUserAsync(user);
            }

            // Generate JWT Token
            var token = repo.GetTokenUserByGoogleIdAsync(user.Id.ToString(), user.Email, _config["Jwt:SecretKey"]);
            return Ok(new { token });
        }*/
    }
   /* public class GoogleAuthRequest
    {
        public string IdToken { get; set; }
    }*/
}

