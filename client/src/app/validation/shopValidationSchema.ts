import * as yup from "yup";

export const CreateShopSchema = yup.object({
    name: yup.string().min(5).required(),
    tablesCount: yup.number().min(1).required("This field is required"),

});

export const EditShopSchema = yup.object({
    name: yup.string().min(5).required(),
    tablesCount: yup.number().min(1).required("This field is required"),
});