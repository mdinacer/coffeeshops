using API.Models.Notifications;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class NotificationsController : BaseApiController
    {
        private readonly INotificationSink _notificationSink;
        public NotificationsController(INotificationSink notificationSink)
        {
            _notificationSink = notificationSink;

        }

        [Authorize]
        [HttpPost()]
        public async Task<IActionResult> Notify([FromBody] Notification notification)
        {
            if (string.IsNullOrEmpty(ShopId)) return BadRequest();

            await _notificationSink.PushAsync(notification);
            return Ok();
        }
    }
}