namespace API.Models.Notifications
{
    public class Notification
    {
        public string ShopId { get; set; }
        public string? UserId { get; set; }
        public string? EntityId { get; set; }
        public string Nature { get; set; }
        public string? Message { get; set; }
        public object? Payload { get; set; }


        public Notification()
        {

        }

        public Notification(string shopId, string nature, string message)
        {
            ShopId = shopId;
            Nature = nature;
            Nature = message;
        }

        public Notification(ShopEntity entity, string userId, string nature)
        {
            ShopId = entity.ShopId;
            EntityId = entity.Id;
            UserId = userId;
            Nature = nature;
        }

        public Notification(ShopEntity entity, string nature)
        {
            ShopId = entity.ShopId;
            EntityId = entity.Id;
            Nature = nature;
        }
    }
}