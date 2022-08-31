using API.Data;
using Api.Models.Notifications;
using Microsoft.AspNetCore.SignalR;

namespace API.Services;

public class Hubs : Hub
{
    private readonly DataContext _context;

    public Hubs(DataContext context)
    {
        _context = context;
    }

    public override async Task OnConnectedAsync()
    {
        await AddUser();
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await RemoveUser();
        await base.OnDisconnectedAsync(exception);
    }


    public async Task SendMessage(NotifyMessage message)
    {
        await Clients.Others.SendAsync("ReceiveMessage", message);
    }

    public async Task SendNotification(EntityNotifyMessage entity)
    {
        await Clients.Others.SendAsync("ReceiveMessage", entity);
    }

    public async Task AddToGroup(string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

        //await Clients.Group(groupName).SendAsync("ReceiveMessage", $"{Context.User?.Identity?.Name ?? Context.ConnectionId} has joined the group {groupName}.");
        await Clients.OthersInGroup(groupName).SendAsync("ReceiveMessage",
            $"{Context.User?.Identity?.Name ?? Context.ConnectionId} vient de se connecter.");
    }

    public async Task RemoveFromGroup(string groupName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

        //await Clients.Group(groupName).SendAsync("ReceiveMessage", $"{Context.User?.Identity?.Name ?? Context.ConnectionId} has left the group {groupName}.");
        await Clients.OthersInGroup(groupName).SendAsync("ReceiveMessage",
            $"{Context.User?.Identity?.Name ?? Context.ConnectionId} vient de se déconnecter.");
    }

    private async Task AddUser()
    {
        if (Context.User == null || Context.User.Claims == null) return;
        var shopId = Context.User?.Claims?.SingleOrDefault(c => c.Type == "shopId")?.Value ?? "";

        if (!string.IsNullOrEmpty(shopId)) await AddToGroup(shopId);
    }

    private async Task RemoveUser()
    {
        if (Context.User == null || Context.User.Claims == null) return;
        var shopId = Context.User.Claims.SingleOrDefault(c => c.Type == "shopId")?.Value ?? "";

        if (!string.IsNullOrEmpty(shopId)) await RemoveFromGroup(shopId);
    }
}