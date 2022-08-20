using API.DTO;
using API.Models;
using AutoMapper;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<RegisterDto, User>();
            CreateMap<UserProfile, UserProfileDto>();
            CreateMap<CreateProfileDto, UserProfile>();
            CreateMap<EditProfileDto, UserProfile>();

            CreateMap<CreateShopDto, Shop>();
            CreateMap<UpdateShopDto, Shop>();
            CreateMap<Shop, ShopDto>();
            //.ForMember(d => d.Owner, o => o.MapFrom(s => s.Owner.Profile != null ? s.Owner.Profile.GetFullName() : string.Empty));
            CreateMap<Shop, ShopDetailsDto>()
            //.ForMember(d => d.Owner, o => o.MapFrom(s => s.Owner.Profile))
            .ForMember(d => d.ProductsCount, o => o.MapFrom(s => s.Products.Count))
            .ForMember(d => d.OperationsCount, o => o.MapFrom(s => s.Operations.Count));

            CreateMap<Operation, OperationDto>();

            CreateMap<OperationElement, OperationElementDto>();



            CreateMap<Product, ProductDto>();
            CreateMap<Product, ProductSmallDto>();
            CreateMap<Product, ProductFullDto>().ForMember(d => d.Category, o => o.MapFrom(s => s.Category.Name));
            CreateMap<CreateProductDto, Product>()
            .ForSourceMember(x => x.ExpiryDate, y => y.DoNotValidate())
            .ForSourceMember(x => x.PurchasePrice, y => y.DoNotValidate());
            CreateMap<EditProductDto, Product>();

            CreateMap<ProductBatch, ProductBatchDto>();

            CreateMap<Category, CategoryDto>();

            CreateMap<Operation, OperationDto>().ForMember(dest => dest.Remain, opt => opt.MapFrom(src => src.GetRemain()));
            CreateMap<CreateOperationDto, Operation>()
            .ForSourceMember(x => x.AgentId, y => y.DoNotValidate());

            CreateMap<EditOperationDto, Operation>();

            CreateMap<OperationElement, OperationElementDto>();
            CreateMap<CreateOperationElementDto, OperationElement>();
            CreateMap<EditOperationElementDto, OperationElement>();

            CreateMap<Agent, AgentDto>();
            CreateMap<Agent, AgentFullDto>()

            .ForMember(dest => dest.OperationsCount, opt => opt.MapFrom(src => src.Operations.Count))
            .ForMember(dest => dest.PaymentsCount, opt => opt.MapFrom(src => src.Payments.Count));
            CreateMap<CreateAgentDto, Agent>();
            CreateMap<EditAgentDto, Agent>();


            CreateMap<MoneyTransaction, TransactionDto>()
            .ForMember(d => d.User, o => o.MapFrom(s => s.User.UserName));

            CreateMap<CreateTransactionDto, MoneyTransaction>();


            CreateMap<MoneyTransaction, PaymentDto>()
            .ForMember(d => d.User, o => o.MapFrom(s => s.User.UserName))
            .ForMember(d => d.Agent, o => o.MapFrom(s => s.Agent != null ? s.Agent.Name : string.Empty));

            CreateMap<CreatePaymentDto, MoneyTransaction>();

        }
    }
}