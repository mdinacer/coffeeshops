using System.Text;
using API.Data;
using API.DTO;
using API.Models;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AccountController(UserManager<User> userManager, TokenService tokenService, DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users
            .Include(u => u.Profile)
            .SingleOrDefaultAsync(u => u.UserName == loginDto.Username);
            //_userManager.FindByNameAsync(loginDto.Username);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return Unauthorized();
            }


            return new UserDto
            {
                Username = user.UserName,
                Email = user.Email,
                Profile = _mapper.Map<UserProfileDto>(user.Profile) ?? null,
                Token = await _tokenService.CreateToken(user),
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromForm] RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email pris");
                return ValidationProblem();
            }

            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Le nom d'utilisateur est deja pris");
                return ValidationProblem();
            }

            var user = _mapper.Map<User>(registerDto);

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            var origin = Request.Headers["origin"];
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
            var message = $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>Click to verify email</a></p>";

            await _userManager.AddToRoleAsync(user, "Owner");

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("verifyEmail")]
        public async Task<IActionResult> VerifyEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return Unauthorized();
            var decodedTokenBytes = WebEncoders.Base64UrlDecode(token);
            var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);
            var result = await _userManager.ConfirmEmailAsync(user, decodedToken);

            if (!result.Succeeded) return BadRequest("Could not verify email address");

            return Ok("Email confirmed - you can now login");
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _context.Users
            .Include(u => u.Profile)
                .SingleOrDefaultAsync(u =>
                    u.UserName == User.Identity!.Name);

            if (user == null) return BadRequest(new ProblemDetails { Title = "You must be logged in" });

            var profile = user.Profile != null ? _mapper.Map<UserProfileDto>(user.Profile) : null;
            return new UserDto
            {
                Username = user.UserName,
                Email = user.Email,
                Profile = profile,
                Token = await _tokenService.CreateToken(user),
            };
        }


        // [HttpPost("sendMail")]
        // public async Task<IActionResult> SendMail([FromForm] MailRequest request)
        // {
        //     await _mailService.SendContactMessageAsync(request);
        //     return Ok();
        // }

        [Authorize]
        [HttpPost("profile")]
        public async Task<ActionResult<UserProfileDto>> CreateProfile([FromForm] CreateProfileDto createProfile)
        {
            var user = await _context.Users
            .Include(u => u.Profile)
                .SingleOrDefaultAsync(u =>
                    u.UserName == User.Identity!.Name);

            if (user == null) return BadRequest(new ProblemDetails { Title = "You must be logged in" });
            if (user.Profile != null) return BadRequest(new ProblemDetails { Title = "You already have a profile" });

            var profile = _mapper.Map<UserProfile>(createProfile);
            profile.UserId = user.Id;
            profile.Email = user.Email;
            user.Profile = profile;

            var success = await _context.SaveChangesAsync() > 0;

            return success
            ? Ok(_mapper.Map<UserProfileDto>(profile))
            : BadRequest(new ProblemDetails { Title = "Error creating profile" });
        }

        [Authorize]
        [HttpPut("profile")]
        public async Task<ActionResult<UserProfileDto>> EditProfile([FromForm] EditProfileDto editProfile)
        {
            var user = await _context.Users
            .Include(u => u.Profile)
                .SingleOrDefaultAsync(u =>
                    u.UserName == User.Identity!.Name);

            if (user == null) return BadRequest(new ProblemDetails { Title = "You must be logged in" });
            if (user.Profile == null) return BadRequest(new ProblemDetails { Title = "You don't have a profile" });

            _mapper.Map<EditProfileDto, UserProfile>(editProfile, user.Profile);
            user.Profile.Email = user.Email;

            var success = await _context.SaveChangesAsync() > 0;

            return success
            ? Ok(_mapper.Map<UserProfileDto>(user.Profile))
            : BadRequest(new ProblemDetails { Title = "Error creating profile" });
        }


    }
}