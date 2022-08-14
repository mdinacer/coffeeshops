using API.Data;
using API.DTO;
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
    [Authorize]
    public class CategoriesController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;
        public CategoriesController(DataContext context, IMapper mapper, ImageService imageService)
        {
            _imageService = imageService;
            _mapper = mapper;
            _context = context;
        }

        [Cached(86400 * 365)]
        [HttpGet]
        public async Task<ActionResult<List<CategoryDto>>> GetCategories()
        {
            var categories = await _context.Categories.Where(p => p.Validated)
            .OrderBy(c => c.Id)
            .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

            return Ok(categories);
        }

        [HttpPost]
        public async Task<ActionResult<CategoryDto>> CreateCategory([FromForm] CreateCategoryDto createCategory)
        {
            var categoryName = createCategory.Name.Trim().ToLower();

            if (_context.Categories.Any(c => c.Name == categoryName)) return BadRequest("Category already exists");

            var category = new Category { Name = categoryName };

            if (createCategory.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(createCategory.File, "categories", new ImageTransform
                {
                    Height = 250,
                    Width = 250,
                    Crop = CropMode.fill,
                    Gravity = "auto"
                });

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                category.PictureUrl = imageResult.SecureUrl.ToString();
                category.PublicId = imageResult.PublicId;
            }

            _context.Categories.Add(category);

            var success = await _context.SaveChangesAsync() > 0;

            return success ? Ok(_mapper.Map<CategoryDto>(category)) : BadRequest(new ProblemDetails { Title = "Error creating category" });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CategoryDto>> CreateCategory(string id, [FromForm] EditCategoryDto editCategory)
        {
            var categoryName = editCategory.Name.Trim().ToLower();

            if (_context.Categories.Any(c => c.Name == categoryName)) return BadRequest("Category with the same name already exists");

            var category = await _context.Categories.FindAsync(id);

            if (category == null) return NotFound("Category not found");

            category.Name = categoryName;

            if (editCategory.File != null)
            {
                if (!string.IsNullOrEmpty(category.PublicId))
                {
                    await _imageService.DeleteImageAsync(category.PublicId);
                    category.PublicId = "";
                    category.PictureUrl = "";
                }

                var imageResult = await _imageService.AddImageAsync(editCategory.File, "categories", new ImageTransform
                {
                    Height = 250,
                    Width = 250,
                    Crop = CropMode.fill,
                    Gravity = "auto"

                });

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                category.PictureUrl = imageResult.SecureUrl.ToString();
                category.PublicId = imageResult.PublicId;
            }

            var success = await _context.SaveChangesAsync() > 0;

            return success ? Ok(_mapper.Map<CategoryDto>(category)) : BadRequest(new ProblemDetails { Title = "Error creating category" });

        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<CategoryDto>> DeleteCategory(string id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null) return NotFound("Category not found");

            _context.Categories.Remove(category);

            var success = await _context.SaveChangesAsync() > 0;

            return success ? Ok() : BadRequest(new ProblemDetails { Title = "Error deleting category" });

        }
    }
}