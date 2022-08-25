using API.Helpers;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Session;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace API.Extensions
{
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
            services.AddSignalR();
            services.AddScoped<EmailSender>();
            //services.AddScoped<PaymentService>();

            services.AddSignalR(e => { e.MaximumReceiveMessageSize = 102400000; });

            return services;
        }
    }
}