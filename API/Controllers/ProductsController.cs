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
    [Authorize(Policy = "IsShopMember")]
    public class ProductsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly HistoryCacheService _history;

        private readonly ImageService _imageService;
        public ProductsController(DataContext context, IMapper mapper, HistoryCacheService history, ImageService imageService)
        {
            _history = history;
            _mapper = mapper;
            _context = context;
            _imageService = imageService;
        }

        // [Cached(60 * 30)]
        [HttpGet("list")]
        public async Task<ActionResult<List<ProductSmallDto>>> GetProducts()
        {
            return await _context.Products
             .Where(p => p.ShopId == ShopId)
             .OrderBy(p => p.Name)
             .ProjectTo<ProductSmallDto>(_mapper.ConfigurationProvider)
             .ToListAsync();
        }


        // [Cached(60 * 60)]
        [HttpGet()]
        public async Task<ActionResult<PagedList<ProductFullDto>>> GetProducts([FromQuery] ProductsParams productsParams)
        {
            var query = _context.Products
            .Where(p => p.ShopId == ShopId)
            .Filter(productsParams.CategoryId, productsParams.Showcase)
            .Search(productsParams.SearchTerm)
            .Sort(productsParams.OrderBy)
            .ProjectTo<ProductFullDto>(_mapper.ConfigurationProvider)
            .AsQueryable();

            var products =
                await PagedList<ProductFullDto>.CreateAsync(query, productsParams.PageNumber, productsParams.PageSize, productsParams.Paginate);

            Response.AddPaginationHeader(products.MetaData);

            return Ok(products);
        }

        //[Cached(600)]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductFullDto>> GetProduct(string id)
        {
            var product = await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Batches)
            .SingleOrDefaultAsync(p => p.Id == id && p.ShopId == ShopId);

            if (product != null)
            {
                var productDto = _mapper.Map<ProductFullDto>(product);
                var averageSale = await GetAverageSale(product);
                productDto.AverageSale = averageSale;
                return Ok(productDto);
            }
            else
            {
                return NotFound("Product not found");
            }
        }

        [HttpGet("{id}/batches")]
        public async Task<ActionResult<List<ProductBatchDto>>> GetProductBatches(string id)
        {
            return await _context.ProductsBatches
            .Where(b => b.ProductId == id && b.ShopId == ShopId)
            .ProjectTo<ProductBatchDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        [HttpGet("{id}/purchases")]
        public async Task<ActionResult<List<OperationElementDto>>> GetProductPurchases(string id)
        {
            return await _context.OperationsElements
            .Include(element => element.Operation)
            .Where(element => element.ProductId == id && element.Operation.Type == ShopOperationType.purchase
            )
            .ProjectTo<OperationElementDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

        }


        [Authorize(Policy = "IsShopModerator")]
        [HttpPost()]
        public async Task<ActionResult<ProductFullDto>> CreateProduct([FromForm] CreateProductDto createProduct)
        {
            createProduct.Name = createProduct.Name.Trim().ToLower();
            var product = await _context.Products
            .SingleOrDefaultAsync(p => p.Name == createProduct.Name);

            if (product != null) return BadRequest("Product already exists");


            product = _mapper.Map<Product>(createProduct);
            product.ShopId = ShopId!;

            if (createProduct.MinQuantity > 0 && createProduct.MinQuantity != product.MinQuantity)
            {
                product.MinQuantity = createProduct.MinQuantity;
            }

            if (createProduct.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(createProduct.File, "products", new ImageTransform
                {
                    Height = 400,
                    Width = 400,
                    Crop = CropMode.fill,
                    Gravity = "auto"
                });

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            var category = await _context.Categories.FindAsync(createProduct.CategoryId);

            if (category != null)
            {
                product.CategoryId = category.Id;
                product.Category = category;
            }

            if (createProduct.UseInventory && createProduct.Quantity > 0)
            {
                var batch = new ProductBatch
                {
                    ShopId = product.ShopId,
                    Date = DateTime.UtcNow,
                    ProductId = product.Id,
                    ExpiryDate = createProduct.ExpiryDate,
                    Quantity = createProduct.Quantity,
                    Active = true,
                    Price = createProduct.PurchasePrice ?? 0,
                    Profit = createProduct.PurchasePrice != null ? createProduct.Price - createProduct.PurchasePrice.Value : 0,
                };
                product.Batches.Add(batch);
            }


            _context.Products.Add(product);

            var success = await _context.SaveChangesAsync() > 0;

            if (success)
            {
                CreateProductHistoryElement(product);
                return Ok(_mapper.Map<ProductFullDto>(product));
            }
            else
            {
                return BadRequest(new ProblemDetails { Title = "Error creating product" });
            }
        }


        [Authorize(Policy = "IsShopModerator")]
        [HttpPut("{id}")]
        public async Task<ActionResult<ProductFullDto>> UpdateProduct(string id, [FromForm] EditProductDto editProduct)
        {
            var product = await _context.Products.SingleOrDefaultAsync(p => p.Id == id && p.ShopId == ShopId);

            if (product == null) return BadRequest("Product doesn't exist");

            _mapper.Map(editProduct, product);

            if (editProduct.MinQuantity > 0 && editProduct.MinQuantity != product.MinQuantity)
            {
                product.MinQuantity = editProduct.MinQuantity;
            }

            if (editProduct.File != null)
            {
                if (!string.IsNullOrEmpty(product.PublicId))
                {
                    await _imageService.DeleteImageAsync(product.PublicId);
                    product.PublicId = "";
                    product.PictureUrl = "";
                }

                var imageResult = await _imageService.AddImageAsync(editProduct.File, "products", new ImageTransform
                {
                    Height = 250,
                    Width = 250,

                });

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            var category = await _context.Categories.FindAsync(editProduct.CategoryId);

            if (category != null)
            {
                product.CategoryId = category.Id;
                product.Category = category;
            }

            var success = await _context.SaveChangesAsync() > 0;

            if (success)
            {
                CreateProductHistoryElement(product);
                return Ok(_mapper.Map<ProductFullDto>(product));
            }
            else
            {
                return BadRequest(new ProblemDetails { Title = "Error updating product" });
            }
        }

        [Authorize(Policy = "IsShopModerator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            var product = await _context.Products.SingleOrDefaultAsync(p => p.Id == id && p.ShopId == ShopId);

            if (product == null) return BadRequest("Product doesn't exist");

            _context.Products.Remove(product);

            var success = await _context.SaveChangesAsync() > 0;

            if (success)
            {
                CreateProductHistoryElement(product);
                return Ok(true);
            }
            else
            {
                return BadRequest(new ProblemDetails { Title = "Error creating product" });
            }
        }

        private async Task<int?> GetAverageSale(Product product)
        {
            var purchases = await _context.OperationsElements
            .Include(element => element.Operation)
            .Where(element => element.ProductId == product.Id && element.Operation.Type == ShopOperationType.sale
            )
            .ToListAsync();

            if (!purchases.Any())
            {
                return null;
            }


            var maxDate = purchases.Max(o => o.Date);
            var minDate = purchases.Min(o => o.Date);
            var daysCount = (maxDate.Date - minDate.Date).Days;

            if (daysCount < 7)
            {
                return null;
            }

            if (product.SoldQuantity > 0)
            {
                var average = product.SoldQuantity / daysCount;
                return average;
            }
            else
            {
                return null;
            }
        }

        private async void CreateProductHistoryElement(Product product)
        {
            var user = await UserAccessor.GetUser(HttpContext, _context);
            if (string.IsNullOrEmpty(ShopId) || user == null) return;
            await _history.CreateHistoryElement(HttpContext, user, ShopId, product);
        }
    }
}