import * as yup from "yup";



export const TransactionValidationSchema = yup.object({
    amount: yup.number().moreThan(0).required(),
    description: yup.string().max(255).optional().nullable(),
    direction: yup.string().max(255).required(),
});