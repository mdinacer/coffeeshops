using System.Security.Claims;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.Services
{
    [Authorize]
    public class NotificationHub : Hub
    {
        private readonly DataContext _context;
        public NotificationHub(DataContext context)
        {
            _context = context;
        }

        public override async Task OnConnectedAsync()
        {
            //

            var shopId = Context.User.FindFirstValue("shopId");
            await JoinRoom(shopId);
            var shop = await GetShop(shopId);
            await Clients.OthersInGroup(shopId).SendAsync("connection", $" user {Context.User.Identity.Name} joined room {shop.Name}");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var shopId = Context.User.FindFirstValue("shopId");
            await LeaveRoom(shopId);
            await Clients.OthersInGroup(shopId).SendAsync("connection", $" user {Context.User.Identity.Name} left room {shopId}");
            await base.OnDisconnectedAsync(exception);
        }

        public Task JoinRoom(string roomName)
        {
            return Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        }

        public Task LeaveRoom(string roomName)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
        }

        private async Task<Shop?> GetShop(string shopId)
        {
            if (string.IsNullOrEmpty(shopId)) return null;

            return await _context.Shops.FindAsync(shopId);
        }
    }


}