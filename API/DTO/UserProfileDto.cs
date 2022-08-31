namespace API.DTO;

public class UserProfileDto
{
    public string Id { get; set; }
    public string FullName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string? Phone { get; set; }
    public string Mobile { get; set; }
    public string Address1 { get; set; }
    public string? Address2 { get; set; }
}

public class CreateProfileDto
{
    public string FirstName { get; set; }

    public string LastName { get; set; }

    //public string Email { get; set; }
    public string? Phone { get; set; }
    public string Mobile { get; set; }
    public string Address1 { get; set; }
    public string? Address2 { get; set; }
}

public class EditProfileDto
{
    public string FirstName { get; set; }

    public string LastName { get; set; }

    //public string Email { get; set; }
    public string? Phone { get; set; }
    public string Mobile { get; set; }
    public string Address1 { get; set; }
    public string? Address2 { get; set; }
}