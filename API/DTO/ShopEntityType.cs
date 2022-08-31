using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public enum ShopEntityType
{
    [Display(Name = "produit")] product,
    [Display(Name = "transaction")] transaction,
    [Display(Name = "vente")] order,
    [Display(Name = "achat")] purchase,
    [Display(Name = "client")] client,
    [Display(Name = "fournisseur")] provider,
    [Display(Name = "cafétéria")] shop,
    [Display(Name = "utilisateur")] profile
}