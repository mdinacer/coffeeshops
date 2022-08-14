using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class User : IdentityUser
    {
        public string? ProfileId { get; set; }
        public UserProfile? Profile { get; set; }
        public string? ShopId { get; set; }
        public Shop? Shop { get; set; }
    }
}