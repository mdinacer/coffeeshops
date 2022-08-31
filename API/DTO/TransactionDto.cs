using System.Diagnostics;
using API.Models;

namespace API.DTO;

public class TransactionDto
{
    public string Id { get; set; }
    public string Date { get; set; }
    public decimal Amount { get; set; }
    public string? Description { get; set; }
    public string? User { get; set; }
    public string? AgentId { get; set; }
    public string? Agent { get; set; }
    public TransactionDirection Direction { get; set; }
    public TraceEventType Type { get; set; }
}

public class CreateTransactionDto
{
    public decimal Amount { get; set; }
    public string? Description { get; set; }
    public TransactionDirection Direction { get; set; }
}