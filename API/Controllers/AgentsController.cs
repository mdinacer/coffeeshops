using API.Data;
using API.DTO;
using API.Extensions;
using API.Helpers;
using API.Models;
using API.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize(Policy = "IsShopMember")]
public class AgentsController : BaseApiController
{
    private readonly DataContext _context;
    private readonly HistoryCacheService _history;
    private readonly IMapper _mapper;

    public AgentsController(DataContext context, IMapper mapper, HistoryCacheService history)
    {
        _history = history;
        _mapper = mapper;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<AgentFullDto>>> GetAgents([FromQuery] AgentsParams agentsParams)
    {
        var query = _context.Agents
            .Include(a => a.Operations)
            .Include(a => a.Payments)
            .Filter(agentsParams.Type, agentsParams.DebtOnly)
            .Search(agentsParams.SearchTerm)
            .Sort(agentsParams.OrderBy)
            .ProjectTo<AgentFullDto>(_mapper.ConfigurationProvider)
            .AsQueryable();

        var agents =
            await PagedList<AgentFullDto>.CreateAsync(query, agentsParams.PageNumber, agentsParams.PageSize);

        Response.AddPaginationHeader(agents.MetaData);

        return agents;
    }

    [HttpGet("list")]
    public async Task<ActionResult<List<AgentDto>>> GetAgentsList([FromQuery] AgentsParams agentParams)
    {
        return await _context.Agents
            .Filter(agentParams.Type)
            .ProjectTo<AgentDto>(_mapper.ConfigurationProvider)
            .OrderBy(c => c.Name)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AgentFullDto>> GetAgent(string id)
    {
        var agent = await _context.Agents
            .Include(a => a.Operations)
            .Include(a => a.Payments)
            .SingleOrDefaultAsync(a => a.Id == id && a.ShopId == ShopId);
        return agent != null
            ? Ok(_mapper.Map<AgentFullDto>(agent))
            : BadRequest(new ProblemDetails { Title = "Agent not found" });
    }

    [HttpPost]
    public async Task<ActionResult<AgentDto>> CreateAgent([FromForm] CreateAgentDto createAgent)
    {
        createAgent.Name = createAgent.Name.Trim().ToLower();

        if (_context.Agents.Any(a => a.Name.Equals(createAgent.Name) && a.Type == createAgent.Type))
            return BadRequest(new ProblemDetails { Title = "Agent already registered" });
        var agent = new Agent
        {
            Id = Guid.NewGuid().ToString(),
            ShopId = ShopId!,
            Total = 0,
            Paid = 0
        };

        _mapper.Map(createAgent, agent);

        _context.Agents.Add(agent);
        var success = await _context.SaveChangesAsync() > 0;


        if (success)
        {
            CreateAgentHistoryElement(agent);
            return Ok(_mapper.Map<AgentDto>(agent));
        }

        return BadRequest(new ProblemDetails { Title = "Error creating agent" });
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<AgentDto>> EditAgent(string id, [FromForm] EditAgentDto editAgent)
    {
        var agent = await _context.Agents.SingleOrDefaultAsync(a => a.Id == id && a.ShopId == ShopId);

        if (agent == null) return NotFound("Agent not found");

        _mapper.Map(editAgent, agent);


        var success = await _context.SaveChangesAsync() > 0;

        if (success)
        {
            CreateAgentHistoryElement(agent);
            return Ok(_mapper.Map<AgentDto>(agent));
        }

        return BadRequest(new ProblemDetails { Title = "Error updating agent" });
    }

    [Authorize(Policy = "IsShopModerator")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAgent(string id)
    {
        var agent = await _context.Agents.SingleOrDefaultAsync(a => a.Id == id && a.ShopId == ShopId);

        if (agent == null) return NotFound("Agent not found");

        _context.Agents.Remove(agent);
        var success = await _context.SaveChangesAsync() > 0;

        if (success)
        {
            CreateAgentHistoryElement(agent);
            return Ok(true);
        }

        return BadRequest(new ProblemDetails { Title = "Error deleting agent" });
    }

    private async void CreateAgentHistoryElement(Agent agent)
    {
        var user = await UserAccessor.GetUser(HttpContext, _context);
        if (string.IsNullOrEmpty(ShopId) || user == null) return;
        await _history.CreateHistoryElement(HttpContext.Request.Method, user.Id, user.UserName, ShopId, agent);
    }
}