import * as yup from "yup";

export const OperationValidationSchema = yup.object({
    productId: yup.string().required(),
    quantity: yup.number().min(1, "Quantité minimal 1").required(),
    minQuantity: yup.number().min(0),
    price: yup.number().min(0.1, "le prix doit être supérieur a 0").required(),
    expiryDate: yup.date().optional().nullable(),
});