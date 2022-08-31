using API.Models;

namespace API.DTO;

public class AgentDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string? Phone { get; set; }
    public string Mobile { get; set; }
    public string Address1 { get; set; }
    public string? Address2 { get; set; }
    public AgentType Type { get; set; }
}

public class AgentFullDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string? Phone { get; set; }
    public string Mobile { get; set; }
    public string Address1 { get; set; }
    public string? Address2 { get; set; }
    public decimal Total { get; set; }
    public decimal Paid { get; set; }
    public decimal Debt { get; set; }
    public int OperationsCount { get; set; }
    public int PaymentsCount { get; set; }
    public AgentType Type { get; set; }
}

public class CreateAgentDto
{
    public string Name { get; set; }
    public string Mobile { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Address1 { get; set; }
    public string? Address2 { get; set; }
    public AgentType Type { get; set; }
}

public class EditAgentDto
{
    public string? Name { get; set; }
    public string? Mobile { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Address1 { get; set; }
    public string? Address2 { get; set; }
}