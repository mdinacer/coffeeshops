import * as yup from "yup";

export const AgentValidationSchema = yup.object({
    name: yup.string().min(4).max(255).required(),
    phone: yup.string().max(255).optional().nullable(),
    mobile: yup.string().max(255).optional().nullable(),
    email: yup.string().email().max(255).optional().nullable(),
    address1: yup.string().max(255).optional().nullable(),
    address2: yup.string().optional().optional().nullable(),
});

