using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
    private string? _shopId;
    protected string? ShopId => _shopId ??= GetShopHeader();

    protected BaseApiController()
    {
        // test 
        Debug.WriteLine("Test Creation");
    }
    private string? GetShopHeader()
    {
        var success = HttpContext.Request.Headers.TryGetValue("X-SHOP", out var shopHeader);

        return success ? shopHeader.ToString() : null;
    }
}