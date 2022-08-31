using API.DTO;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize(Policy = "IsShopMember")]
public class OrdersController : BaseApiController
{
    private readonly RedisService _redis;
    private readonly INotificationSink _notificationSink;

    public OrdersController(RedisService redis, INotificationSink notificationSink)
    {
        _notificationSink = notificationSink;
        _redis = redis;
    }

    [HttpGet]
    public async Task<ActionResult<List<CacheShopOrder>>> GetOrders()
    {
        if (string.IsNullOrEmpty(ShopId)) return BadRequest("Shop not found");

        var orders = await _redis.GetOrdersAsync(ShopId);

        return Ok(orders);
    }


    [HttpPost]
    public async Task<ActionResult<List<CacheShopOrder>>> UpdateOrders(ShopOrdersDto shopOrders)
    {
        if (string.IsNullOrEmpty(ShopId)) return BadRequest("Shop not found");

        // await _notificationSink.PushAsync(new Notification
        // {
        //     ShopId = ShopId,
        //     Nature = "ordersUpdated"

        // });

        var updatedOrders = await _redis.UpdateOrderAsync(ShopId, shopOrders);
        return Ok(updatedOrders);
    }

    [HttpDelete]
    public async Task DeleteOrderAsync(string id)
    {
        await _redis.ClearOrdersAsync(id);
    }
}