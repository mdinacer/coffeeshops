using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Web;
using API.Data;
using API.DTO;
using API.Extensions;
using API.Models;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly DataContext _context;
    private readonly EmailSender _emailSender;
    private readonly IMapper _mapper;
    private readonly SignInManager<User> _signInManager;
    private readonly TokenService _tokenService;
    private readonly UserManager<User> _userManager;

    public AccountController(UserManager<User> userManager, SignInManager<User> signInManager,
        TokenService tokenService, DataContext context, IMapper mapper, EmailSender emailSender)
    {
        _signInManager = signInManager;
        _emailSender = emailSender;
        _context = context;
        _mapper = mapper;
        _tokenService = tokenService;
        _userManager = userManager;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _context.Users
            .Include(u => u.Profile)
            .SingleOrDefaultAsync(u => u.Email == loginDto.Email);

        if (user == null) return Unauthorized("Invalid email");

        if (user.UserName == "admin") user.EmailConfirmed = true;

        if (!user.EmailConfirmed) return Unauthorized("Email not confirmed");

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        var userDto = new UserDto
        {
            Username = user.UserName,
            Email = user.Email,
            Profile = _mapper.Map<UserProfileDto>(user.Profile) ?? null,
            Token = await _tokenService.CreateToken(user)
        };

        if (result.Succeeded)
        {
            await SetRefreshToken(user);
            return userDto;
        }

        return Unauthorized("Invalid password");
    }

    [AllowAnonymous]
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

        await _userManager.AddToRoleAsync(user, "Owner");

        //if (!result.Succeeded) return BadRequest("Problem registering user");

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors) ModelState.AddModelError(error.Code, error.Description);

            return ValidationProblem();
        }

        var origin = Request.Headers["origin"];
        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

        var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
        var message =
            $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>Click to verify email</a></p>";

        await _emailSender.SendEmailAsync(user.Email, "Please verify email", message);

        return Ok("Registration success - please verify email");
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

    [AllowAnonymous]
    [HttpGet("resendEmailConfirmationLink")]
    public async Task<IActionResult> ResendEmailConfirmationLink(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null) return Unauthorized();

        var origin = Request.Headers["origin"];

        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

        var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
        var message =
            $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>Click to verify email</a></p>";

        await _emailSender.SendEmailAsync(user.Email, "Please verify email", message);

        return Ok("Email verification link resent");
    }


    [AllowAnonymous]
    [HttpGet("sendPasswordResetLink")]
    public async Task<IActionResult> SendPasswordResetLink([FromQuery] string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null) return Unauthorized();
        var origin = Request.Headers["origin"];

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

        var uri = new Uri($"{origin}/account/resetPassword")
            .AddParameter("token", token)
            .AddParameter("email", user.Email);


        var message =
            $"<p>Please click the below link to reset your password:</p><p><a href='{uri.ToString()}'>Click to reset password</a></p>";

        await _emailSender.SendEmailAsync(user.Email, "Password Reset", message);

        return Ok("Password reset link sent");
    }


    [HttpPost("resetPassword")]
    public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPassword)
    {
        var user = await _userManager.FindByEmailAsync(resetPassword.Email);

        if (user == null) return Unauthorized();

        var decodedTokenBytes = WebEncoders.Base64UrlDecode(resetPassword.Token);
        var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);
        var result = await _userManager.ResetPasswordAsync(user, decodedToken, resetPassword.NewPassword);

        if (!result.Succeeded) return BadRequest("Could not reset your password");

        return Ok("Password reset");
    }

    [HttpPost("changePassword")]
    public async Task<IActionResult> ChangePassword(ChangePasswordDto changePassword)
    {
        var user = await _context.Users
           .SingleOrDefaultAsync(u =>
               u.UserName == User.Identity!.Name);

        if (user == null) return Unauthorized();


        var result = await _userManager.ChangePasswordAsync(user, changePassword.CurrentPassword, changePassword.NewPassword);

        if (!result.Succeeded) return BadRequest("Could not change your password");

        return Ok("Password changed");
    }


    [HttpPost("sendEmailChangeRequest")]
    public async Task<IActionResult> ChangeEmailConfirmationLink(ChangeEmailRequestDto changeEmailRequest)
    {
        var user = await _context.Users
           .SingleOrDefaultAsync(u =>
               u.UserName == User.Identity!.Name);

        if (user == null) return Unauthorized();

        var result = await _signInManager.CheckPasswordSignInAsync(user, changeEmailRequest.Password, false);

        if (!result.Succeeded) return Unauthorized();

        var origin = Request.Headers["origin"];

        var token = await _userManager.GenerateChangeEmailTokenAsync(user, changeEmailRequest.NewEmail);
        token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

        var uri = new Uri($"{origin}/account/changeEmail")
            .AddParameter("token", token)
            .AddParameter("email", changeEmailRequest.NewEmail);

        var message =
            $"<p>Please click the below link to change your email:</p><p><a href='{uri.ToString()}'>Click to reset password</a></p>";

        await _emailSender.SendEmailAsync(changeEmailRequest.NewEmail, "Email Change", message);

        return Ok("Email change link sent");
    }

    [HttpPost("changeEmail")]
    public async Task<IActionResult> ChangeEmail(ChangeEmailDto changeEmail)
    {
        var user = await _context.Users
        .Include(u => u.Profile)
            .SingleOrDefaultAsync(u =>
                u.UserName == User.Identity!.Name);

        if (user == null) return Unauthorized();

        var decodedTokenBytes = WebEncoders.Base64UrlDecode(changeEmail.Token);
        var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);

        var result = await _userManager.ChangeEmailAsync(user, changeEmail.NewEmail, decodedToken);

        if (!result.Succeeded) return BadRequest("Could not change your email");
        if (user.Profile != null)
        {
            user.Profile.Email = changeEmail.NewEmail;
            await _context.SaveChangesAsync();
        }

        return Ok("Email changed");
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
        await SetRefreshToken(user);
        var profile = user.Profile != null ? _mapper.Map<UserProfileDto>(user.Profile) : null;
        return new UserDto
        {
            DisplayName = user.DisplayName,
            Username = user.UserName,
            Email = user.Email,
            Profile = profile,
            Token = await _tokenService.CreateToken(user)
        };
    }

    [Authorize]
    [HttpPost("refreshToken")]
    public async Task<ActionResult<UserDto>> RefreshToken()
    {
        var refreshToken = Request.Cookies["refreshToken"];
        var user = await _userManager.Users
            .Include(r => r.RefreshTokens)
            .Include(p => p.Profile)
            .FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));

        if (user == null) return Unauthorized();

        var oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);

        if (oldToken != null && !oldToken.IsActive) return Unauthorized();

        var profile = user.Profile != null ? _mapper.Map<UserProfileDto>(user.Profile) : null;

        return new UserDto
        {
            DisplayName = user.DisplayName,
            Username = user.UserName,
            Email = user.Email,
            Profile = profile,
            Token = await _tokenService.CreateToken(user)
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

        _mapper.Map(editProfile, user.Profile);
        user.Profile.Email = user.Email;

        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? Ok(_mapper.Map<UserProfileDto>(user.Profile))
            : BadRequest(new ProblemDetails { Title = "Error creating profile" });
    }

    private async Task SetRefreshToken(User user)
    {
        var refreshToken = _tokenService.GenerateRefreshToken();

        user.RefreshTokens.Add(refreshToken);
        await _userManager.UpdateAsync(user);

        var cookieOptions = new CookieOptions
        {
            HttpOnly = false,
            Expires = DateTime.UtcNow.AddDays(7)
        };

        Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
    }


}