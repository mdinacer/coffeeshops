using API.Data;
using API.DTO;
using API.Extensions;
using API.Helpers;
using API.Models;
using API.Models.ShopChartsData;
using API.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Slugify;

namespace API.Controllers;

public class ShopsController : BaseApiController
{
    private readonly DataContext _context;
    private readonly HistoryCacheService _history;
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;

    public ShopsController(DataContext context, IMapper mapper, HistoryCacheService history,
        UserManager<User> userManager)
    {
        _userManager = userManager;
        _history = history;
        _mapper = mapper;
        _context = context;
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<PagedList<ShopDto>>> GetShops([FromQuery] ShopParams shopParams)
    {
        var query = _context.Shops
            .Search(shopParams.SearchTerm)
            .Sort(shopParams.OrderBy)
            .ProjectTo<ShopDto>(_mapper.ConfigurationProvider)
            .AsQueryable();

        var shops =
            await PagedList<ShopDto>.CreateAsync(query, shopParams.PageNumber, shopParams.PageSize);

        Response.AddPaginationHeader(shops.MetaData);

        return shops;
    }

    //[Authorize(Policy = "IsShopMember")]
    [HttpGet("me")]
    public async Task<ActionResult<ShopDetailsDto>> GetShop()
    {
        var user = await UserAccessor.GetUser(HttpContext, _context);

        if (user == null) return NotFound("User Not found");

        var shop = await _context.Shops
            .Include(s => s.Operations)
            .Include(s => s.Products)
            // .Include(s => s.Owner)
            // .ThenInclude(o => o.Profile)
            .SingleOrDefaultAsync(s => s.Id == user.ShopId);

        if (shop == null) return NotFound("User is not assigned to any shop");

        var shopDetails = _mapper.Map<ShopDetailsDto>(shop);
        shopDetails.isOwner = user.Id == shop.OwnerId;

        return Ok(shopDetails);
    }


    [Authorize]
    [HttpPost]
    public async Task<ActionResult<ShopDto>> CreateShop([FromForm] CreateShopDto createShop)
    {
        var user = await UserAccessor.GetUser(HttpContext, _context);

        if (user == null) return NotFound("User Not found and it's impossible");
        if (user.Shop != null) return BadRequest("User is already assigned to a shop");

        var shop = new Shop
        {
            Id = Guid.NewGuid().ToString(),
            Name = createShop.Name,
            TablesCount = createShop.TablesCount,
            OwnerId = user.Id
        };

        _context.Shops.Add(shop);


        if (createShop.InitialAmount > 0)
        {
            var transaction = new MoneyTransaction
            {
                Amount = createShop.InitialAmount,
                // Shop = shop,
                Description = "Somme Caisse initiale",
                Type = TransactionType.transaction,
                Direction = TransactionDirection.incoming,
                User = user
            };

            shop.Transactions.Add(transaction);
        }

        var success = await _context.SaveChangesAsync() > 0;

        if (success)
        {
            user.ShopId = shop.Id;
            await _context.SaveChangesAsync();
            CreateShopHistoryElement(shop);
            return Ok(_mapper.Map<ShopDto>(shop));
        }

        return BadRequest(new ProblemDetails { Title = "Error creating shop" });
    }

    [Authorize(Policy = "IsShopOwner")]
    [HttpGet("Stats")]
    public async Task<ActionResult<ShopStats>> GetStats()
    {
        var shop = await _context.Shops
            .Include(s => s.Operations)
            .Include(s => s.Transactions)
            .SingleOrDefaultAsync(s => s.Id == ShopId);

        if (shop == null) return NotFound("Shop Not found");

        var stats = shop.GetStats();
        return Ok(stats);
    }

    [Authorize(Policy = "IsShopOwner")]
    [HttpGet("Users")]
    public async Task<ActionResult<List<ShopUserDto>>> GetUsers()
    {
        var currentUser = await UserAccessor.GetUser(HttpContext, _context);

        if (currentUser == null) return NotFound("User Not found");

        var users = await _context.Users
            .Where(u => u.ShopId == ShopId)
            .ToListAsync();

        var shopUsers = users.Select(u =>
        {
            var roles = _userManager.GetRolesAsync(u).Result;
            var userDto = new ShopUserDto
            {
                Id = u.Id,
                DisplayName = u.DisplayName,
                Username = u.UserName,
                Email = u.Email,
                Role = roles.FirstOrDefault()!
            };
            return userDto;
        }).ToList();

        return Ok(shopUsers);
    }

    [Authorize(Policy = "IsShopOwner")]
    [HttpPost("users")]
    public async Task<ActionResult<ShopUserDto>> AddShopUser(CreateShopUserDto createUser)
    {
        var shop = await _context.Shops.AsNoTracking().SingleOrDefaultAsync(s => s.Id == ShopId);
        if (shop == null) return BadRequest(new ProblemDetails { Title = "Error fetching shop" });

        var helper = new SlugHelper();
        var slug = helper.GenerateSlug(shop.Name);
        var email = $"{createUser.Username}@{slug}.com";

        if (await _userManager.Users.AnyAsync(x => x.Email == email))
        {
            ModelState.AddModelError("email", "Email pris");
            return ValidationProblem();
        }

        if (await _userManager.Users.AnyAsync(x => x.UserName == createUser.Username))
        {
            ModelState.AddModelError("username", "Le nom d'utilisateur est deja pris");
            return ValidationProblem();
        }

        var user = new User
        {
            DisplayName = createUser.DisplayName,
            UserName = createUser.Username,
            Email = email,
            EmailConfirmed = true,
            ShopId = ShopId
        };

        var result = await _userManager.CreateAsync(user, createUser.Password);

        await _userManager.AddToRoleAsync(user, "Agent");
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors) ModelState.AddModelError(error.Code, error.Description);

            return ValidationProblem();
        }

        return Ok(
            new ShopUserDto
            {
                DisplayName = user.DisplayName,
                Username = user.UserName,
                Email = user.Email,
                Role = "Agent"
            }
        );
    }

    [Authorize(Policy = "IsShopOwner")]
    [HttpPut("setOwner")]
    public async Task<ActionResult<ShopDto>> SetShopOwner(UpdateShopOwnerDto updateShop)
    {
        var user = await _context.Users.FindAsync(updateShop.UserId);

        if (user == null) return NotFound("User Not found");
        if (user.ShopId != null) return BadRequest("User is already assigned to a shop");

        var shop = await _context.Shops.SingleOrDefaultAsync(s => s.Id == ShopId);

        if (shop == null) return NotFound("Shop not found");

        shop.OwnerId = user.Id;
        user.ShopId = shop.Id;

        var success = await _context.SaveChangesAsync() > 0;

        if (success)
        {
            CreateShopHistoryElement(shop);
            return Ok(_mapper.Map<ShopDto>(shop));
        }

        return BadRequest(new ProblemDetails { Title = "Error updating shop" });
    }

    [Authorize(Policy = "IsShopModerator")]
    [HttpPut]
    public async Task<ActionResult<ShopDto>> UpdateShop([FromForm] UpdateShopDto updateShop)
    {
        var shop = await _context.Shops.SingleOrDefaultAsync(s => s.Id == ShopId);

        if (shop == null) return NotFound("Shop not found");

        _mapper.Map(updateShop, shop);

        var success = await _context.SaveChangesAsync() > 0;

        if (success)
        {
            CreateShopHistoryElement(shop);
            return Ok(_mapper.Map<ShopDto>(shop));
        }

        return BadRequest(new ProblemDetails { Title = "Error updating shop" });
    }


    [Authorize(Policy = "IsShopOwner")]
    [HttpDelete]
    public async Task<ActionResult<ShopDto>> DeleteShop()
    {
        var shop = await _context.Shops.SingleOrDefaultAsync(s => s.Id == ShopId);

        if (shop == null) return NotFound("Shop not found");

        _context.Shops.Remove(shop);

        var success = await _context.SaveChangesAsync() > 0;

        if (success)
        {
            CreateShopHistoryElement(shop);
            return Ok("Shop Deleted");
        }

        return BadRequest(new ProblemDetails { Title = "Error deleting shop" });
    }

    private async void CreateShopHistoryElement(Shop shop)
    {
        var user = await UserAccessor.GetUser(HttpContext, _context);
        if (string.IsNullOrEmpty(ShopId) || user == null) return;
        await _history.CreateHistoryElement(HttpContext.Request.Method, user.Id, user.UserName, ShopId, shop);
    }
}