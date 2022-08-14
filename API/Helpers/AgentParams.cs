using API.Models;

namespace API.Helpers
{
    public class AgentsParams : PaginationParams
    {
        public string OrderBy { get; set; } = "name";
        public string? SearchTerm { get; set; }
        public AgentType Type { get; set; }
        public bool? DebtOnly { get; set; }
    }
}