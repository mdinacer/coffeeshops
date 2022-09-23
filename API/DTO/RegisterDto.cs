namespace API.DTO;

public class RegisterDto
{
    public string DisplayName { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}

public class ResetPasswordDto
{
    public string Email { get; set; }
    public string Token { get; set; }
    public string NewPassword { get; set; }
}

public class ChangePasswordDto
{

    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
}

public class ChangeEmailRequestDto
{
    public string Password { get; set; }
    public string NewEmail { get; set; }
}

public class ChangeEmailDto
{
    public string Token { get; set; }
    public string NewEmail { get; set; }
}