namespace API.Models;

public class UserProfile : BaseEntity
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string? Phone { get; set; }
    public string Mobile { get; set; }
    public string Address1 { get; set; }
    public string? Address2 { get; set; }
    public string UserId { get; set; }
    public User User { get; set; }

    public string GetFullName()
    {
        return $"{FirstName} {LastName}";
    }
}