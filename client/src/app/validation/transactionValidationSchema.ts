import * as yup from "yup";

export const TransactionValidationSchema = yup.object({
    productId: yup.string().required(),
    quantity: yup.number().min(1).required(),
    price: yup.number().min(0.1).required(),
});