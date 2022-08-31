namespace API.DTO;

public class ProductInfoDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string PublicId { get; set; }
    public string PictureUrl { get; set; }
    public string CategoryId { get; set; }
    public string Category { get; set; }
}

public class CreateProductInfoDto
{
    public string Name { get; set; }
    public string CategoryId { get; set; }
    public IFormFile File { get; set; }
}

public class EditProductInfoDto
{
    public string Name { get; set; }
    public string CategoryId { get; set; }
    public IFormFile? File { get; set; }
}