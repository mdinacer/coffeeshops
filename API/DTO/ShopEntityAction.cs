using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public enum ShopEntityAction
{
    [Display(Name = "création")] create,
    [Display(Name = "édition")] update,
    [Display(Name = "suppression")] delete,
    [Display(Name = "autres")] other,
}