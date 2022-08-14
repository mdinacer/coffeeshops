using API.Models;
using Microsoft.OpenApi.Models;

namespace API.DTO
{
    public class OperationDto
    {
        public string Id { get; set; }
        public DateTime Date { get; set; }
        public string? AgentId { get; set; }
        public string? AgentName { get; set; }
        public decimal Total { get; set; }
        public decimal Paid { get; set; }
        public decimal Remain { get; set; }
        public int? Table { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public OperationType Type { get; set; }
        public List<OperationElementDto> Elements { get; set; }
    }


    public class OperationFullDto
    {
        public string Id { get; set; }
        public DateTime Date { get; set; }
        public string? AgentId { get; set; }
        public string? AgentName { get; set; }
        public decimal Total { get; set; }
        public decimal Paid { get; set; }
        public decimal Remain { get; set; }
        public int? Table { get; set; }
        public OperationType Type { get; set; }
        public List<OperationElementDto> Elements { get; set; }
    }

    public class CreateOperationDto
    {
        public ShopOperationType Type { get; set; }
        public List<CreateOperationElementDto> Elements { get; set; }
        public string? AgentId { get; set; }
        public int? Table { get; set; }
        public decimal? Paid { get; set; }
    }

    public class EditOperationDto
    {
        public List<EditOperationElementDto> Elements { get; set; }
    }
}