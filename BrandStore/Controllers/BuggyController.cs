using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading;

namespace BrandStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController : ControllerBase
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound() 
        {
            return NotFound();
        }

        [HttpGet("bad-request")] // lỗi yêu cầu
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails {Title = "This is bad request" });
        }

        [HttpGet("unauthoried")] // chưa được cấp quyền, chưa được cho phép
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }

        [HttpGet("validation-error")]
        public ActionResult GetValidationError() // lỗi trả ra data
        {
            ModelState.AddModelError("Problem1", "this is the first error");
            ModelState.AddModelError("Problem2", "this is the seccond error");
            return ValidationProblem();
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            try
            {
                return Ok("Request Server OK");
            } catch (Exception)
            {
                throw new Exception("This is a server error"); // Exception() ngoại lệ là server error
            }
        }
    }
}
