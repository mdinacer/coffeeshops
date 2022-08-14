namespace API.DTO
{
    public class CategoryDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
    }

    public class CreateCategoryDto
    {
        public string Name { get; set; }
        public IFormFile File { get; set; }


    }

    public class EditCategoryDto
    {
        public string Name { get; set; }
        public IFormFile? File { get; set; }
    }
}