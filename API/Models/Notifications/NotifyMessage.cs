using System.ComponentModel.DataAnnotations;
using API.DTO;

namespace Api.Models.Notifications
{
    public class NotifyMessage
    {
        public string? Message { get; set; }
    }

    public class EntityNotifyMessage
    {
        public ShopEntityAction Action { get; set; }
        public ShopEntityType Type { get; set; }
        public string EntityId { get; set; }
        public string? Message { get; set; }
        public object? value { get; set; }
        public List<string> Roles { get; set; } = new();
    }
}

