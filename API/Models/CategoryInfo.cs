namespace API.Models;

public class CategoryInfo
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string PictureUrl { get; set; }
    public bool Validated { get; set; } = false;
}