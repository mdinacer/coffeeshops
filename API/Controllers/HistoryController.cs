using API.DTO;
using API.Extensions;
using API.Helpers;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize(Policy = "IsShopModerator")]
public class HistoryController : BaseApiController
{
    private readonly HistoryCacheService _history;

    public HistoryController(HistoryCacheService history)
    {
        _history = history;
    }

    [HttpGet]
    public async Task<ActionResult<List<HistoryElementDto>>> GetHistory([FromQuery] HistoryParams historyParams)
    {
        if (string.IsNullOrEmpty(ShopId)) return BadRequest("You must be a shop moderator");
        var elements = await _history.GetHistoryAsync(ShopId);
        if (elements == null) return BadRequest("No history found");
        var query = elements.AsQueryable()
            .Filter(historyParams.UserId, historyParams.StartDate, historyParams.EndDate, historyParams.Type,
                historyParams.Action)
            .Sort(historyParams.OrderBy);

        var history =
            PagedList<HistoryElementDto>.Create(query, historyParams.PageNumber, historyParams.PageSize);

        return Ok(history);
    }

    [HttpDelete]
    public async Task<IActionResult> ClearHistory()
    {
        if (string.IsNullOrEmpty(ShopId)) return BadRequest("You must be a shop moderator");
        var result = await _history.ClearHistoryAsync(ShopId);
        return Ok(result);
    }
}