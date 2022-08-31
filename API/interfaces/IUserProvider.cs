namespace API.interfaces
{
    public interface IUserProvider
    {
        string? GetUserName();
        string? GetUserId();
    }
}