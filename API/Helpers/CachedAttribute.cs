using System.Text;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers;

public class CachedAttribute : Attribute, IAsyncActionFilter
{
    private readonly int _timeToLiveSeconds;

    public CachedAttribute(int timeToLiveSeconds)
    {
        _timeToLiveSeconds = timeToLiveSeconds;
    }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var cacheService = context.HttpContext.RequestServices.GetRequiredService<IResponseCacheService>();

        var cacheKey = GenerateCacheKeyFromRequest(context.HttpContext.Request);
        var cachedResponse = await cacheService.GetCachedResponseAsync(cacheKey);

        if (!string.IsNullOrEmpty(cachedResponse))
        {
            var contentResult = new ContentResult
            {
                Content = cachedResponse,
                ContentType = "application/json",
                StatusCode = 200
            };
            context.Result = contentResult;
            return;
        }

        if (context.HttpContext.Request.Method != "GET") await cacheService.ClearCachedResponseAsync(cacheKey);

        switch (context.HttpContext.Request.Method)
        {
            case "POST":
            case "PUT":
            case "DELETE":

                break;
        }

        ;

        var executedContext = await next();

        if (executedContext.Result is OkObjectResult okObjectResult)
            await cacheService.CacheResponseAsync(cacheKey, okObjectResult.Value!,
                TimeSpan.FromSeconds(_timeToLiveSeconds));
    }

    private string GenerateCacheKeyFromRequest(HttpRequest request)
    {
        var shopId = request.Headers["X-SHOP"].ToString();

        var keyBuilder = new StringBuilder();
        if (!string.IsNullOrEmpty(shopId) && request.Path.HasValue && !request.Path.Value.Contains("Categories"))
            keyBuilder.Append($"{shopId} |");
        keyBuilder.Append($"{request.Path}");

        foreach (var (key, value) in request.Query.OrderBy(x => x.Key)) keyBuilder.Append($"|{key}-{value}");

        return keyBuilder.ToString();
    }
}