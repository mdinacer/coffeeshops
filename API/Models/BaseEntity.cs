namespace API.Models;

public class BaseEntity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public DateTime CreationDate { get; set; } = DateTime.UtcNow;
    public DateTime? LastUpdate { get; set; }
}