using System;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
	[ApiController]
	[Route("/User")]
	public class UserController  : ControllerBase
	{
		public UserController()
		{
		}
		[HttpGet]
		public String test()
		{
			return "hello";
		}
	}
}

