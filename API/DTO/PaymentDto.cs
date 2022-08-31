namespace API.DTO;

public class PaymentDto : TransactionDto
{
    public string Agent { get; set; }
}

public class CreatePaymentDto : CreateTransactionDto
{
    public string AgentId { get; set; }
}