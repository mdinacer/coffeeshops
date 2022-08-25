namespace API.DTO
{
    public class ShopDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int TablesCount { get; set; }
        public string OwnerId { get; set; }
        public string Owner { get; set; }
    }

    public class ShopDetailsDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int TablesCount { get; set; }
        public string OwnerId { get; set; }
        public UserProfileDto Owner { get; set; }
        public int ProductsCount { get; set; }
        public int OperationsCount { get; set; }
        public bool isOwner { get; set; }


        // public List<CategoryDto> Categories { get; set; }
        // public List<ProductDto> Products { get; set; }
        // public List<OperationDto> Operations { get; set; }


    }


    public class CreateShopDto
    {
        public string Name { get; set; }
        public int TablesCount { get; set; }
        public decimal InitialAmount { get; set; }
    }

    public class UpdateShopDto
    {
        public string Name { get; set; }
        public int TablesCount { get; set; }
    }

    public class UpdateShopOwnerDto
    {
        public string UserId { get; set; }
    }
}