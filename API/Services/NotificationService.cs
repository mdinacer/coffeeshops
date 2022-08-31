using System.Text.Json;
using System.Threading.Channels;
using API.Models.Notifications;
using Microsoft.AspNetCore.SignalR;
using StackExchange.Redis;

namespace API.Services
{
    public interface INotificationSink
    {
        ValueTask PushAsync(Notification notification);
    }

    public class NotificationService : BackgroundService, INotificationSink
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<NotificationService> _logger;
        private readonly ConnectionMultiplexer _redis;
        private readonly Channel<Notification> _channel;
        public NotificationService(IServiceProvider serviceProvider, ILogger<NotificationService> logger)
        {
            _channel = Channel.CreateUnbounded<Notification>();
            _logger = logger;
            _serviceProvider = serviceProvider;
            _redis = ConnectionMultiplexer.Connect("127.0.0.1");

        }
        public ValueTask PushAsync(Notification notification)
        {
            return _channel.Writer.WriteAsync(notification);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            // Distributed Scenario
            await _redis.GetSubscriber().SubscribeAsync("notification", async (_, value) =>
            {
                using var scope = _serviceProvider.CreateScope();
                var hub = scope.ServiceProvider.GetRequiredService<IHubContext<NotificationHub>>();
                var notification = JsonSerializer.Deserialize<Notification>(value!)!;
                var payload = new
                {
                    Nature = notification.Nature,
                    Message = notification.Message,
                    EntityId = notification.EntityId,
                    Payload = notification.Payload,
                };
                _logger.LogInformation($"Sending redis notification '{value}'");

                if (!string.IsNullOrEmpty(notification.UserId))
                    await hub.Clients.User(notification.UserId).SendAsync("Notify", payload, stoppingToken);
                else
                {
                    await hub.Clients.Group(notification.ShopId).SendAsync("Notify", payload, stoppingToken);
                }
            });

            // Local
            while (true)
            {
                try
                {
                    if (stoppingToken.IsCancellationRequested)
                    {
                        return;
                    }

                    var notification = await _channel.Reader.ReadAsync(stoppingToken);

                    using var scope = _serviceProvider.CreateScope();

                    var hub = scope.ServiceProvider.GetRequiredService<IHubContext<NotificationHub>>();

                    var payload = new
                    {
                        Nature = notification.Nature,
                        Message = notification.Message,
                        EntityId = notification.EntityId,
                        Payload = notification.Payload,
                    };


                    _logger.LogInformation($"Sending channel notification '{notification.Nature}' to {notification.UserId}");

                    if (!string.IsNullOrEmpty(notification.UserId))
                        await hub.Clients.User(notification.UserId).SendAsync("Notify", payload, stoppingToken);
                    else
                    {
                        await hub.Clients.Group(notification.ShopId).SendAsync("Notify", payload, stoppingToken);
                    }
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error in notification service.");
                }
            }
        }
    }
}