namespace API.DTO
{
    public class UserDto
    {
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public UserProfileDto? Profile { get; set; }
        public string Token { get; set; }
    }

    public class ShopUserDto
    {
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }

    public class CreateShopUserDto
    {
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}