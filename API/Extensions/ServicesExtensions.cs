using System.Text.Json;
using API.Helpers;
using API.interfaces;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace API.Extensions;

public static class ServicesExtensions
{
    public static IServiceCollection AddCustomServices(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        services.AddScoped<TokenService>();
        services.AddScoped<ImageService>();
        services.AddScoped<RedisService>();
        services.AddScoped<HistoryCacheService>();
        services.AddScoped<IResponseCacheService, ResponseCacheService>();
        services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddScoped<EmailSender>();
        services.AddSignalR(e =>
                {
                    e.EnableDetailedErrors = true;
                    e.MaximumReceiveMessageSize = 102400000;
                }).AddJsonProtocol(opt =>
                {
                    opt.PayloadSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                });
        services.AddSingleton<IUserProvider, UserProvider>();
        services.AddSingleton<IUserIdProvider, UserIdProvider>();
        services.AddSingleton<INotificationSink, NotificationService>();
        services.AddHostedService(sp => (NotificationService)sp.GetService<INotificationSink>()!);

        return services;
    }
}