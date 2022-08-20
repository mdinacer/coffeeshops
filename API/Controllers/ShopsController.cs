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

namespace API.Controllers
{

    public class ShopsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly HistoryCacheService _history;

        public ShopsController(DataContext context, IMapper mapper, HistoryCacheService history)
        {
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
                await PagedList<ShopDto>.ToPagedListAsync(query, shopParams.PageNumber, shopParams.PageSize);

            //Response.AddPaginationHeader(shops.MetaData);

            return shops;
        }

        [Authorize(Policy = "IsShopMember")]
        [HttpGet("me")]
        public async Task<ActionResult<ShopDetailsDto>> GetShop()
        {
            var user = await GetUser(_context);

            if (user == null) return NotFound("User Not found");

            var shop = await _context.Shops
            .Include(s => s.Operations)
            .Include(s => s.Products)
            // .Include(s => s.Owner)
            // .ThenInclude(o => o.Profile)
            .SingleOrDefaultAsync(s => s.Id == user.ShopId);

            if (shop == null) return BadRequest("User is not assigned to any shop");

            var shopDetails = _mapper.Map<ShopDetailsDto>(shop);
            shopDetails.isOwner = user.Id == shop.OwnerId;

            return Ok(shopDetails);
        }



        [Authorize()]
        [HttpPost]
        public async Task<ActionResult<ShopDto>> CreateShop([FromForm] CreateShopDto createShop)
        {
            var user = await GetUser(_context);

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

            var success = await _context.SaveChangesAsync() > 0;

            if (success)
            {
                user.ShopId = shop.Id;
                await _context.SaveChangesAsync();
                CreateShopHistoryElement(shop);
                return Ok(_mapper.Map<ShopDto>(shop));
            }
            else
            {
                return BadRequest(new ProblemDetails { Title = "Error creating shop" });
            }
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
            else
            {
                return BadRequest(new ProblemDetails { Title = "Error updating shop" });
            }
        }

        [Authorize(Policy = "IsShopModerator")]
        [HttpPut()]
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
            else
            {
                return BadRequest(new ProblemDetails { Title = "Error updating shop" });
            }
        }


        [Authorize(Policy = "IsShopOwner")]
        [HttpDelete()]
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
            else
            {
                return BadRequest(new ProblemDetails { Title = "Error deleting shop" });
            }
        }
        private async void CreateShopHistoryElement(Shop shop)
        {
            await CreateHistoryElement(_context, _history, shop.Id, shop);
        }

    }
}