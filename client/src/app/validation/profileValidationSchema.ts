import * as yup from "yup";

export const ProfileValidationSchema = yup.object({
    firstName: yup.string().min(4).max(255).required(),
    lastName: yup.string().min(4).max(255).required(),
    phone: yup.string().max(255).optional(),
    mobile: yup.string().max(255).required(),
    address1: yup.string().max(255).required(),
    address2: yup.string().optional().nullable(),
});