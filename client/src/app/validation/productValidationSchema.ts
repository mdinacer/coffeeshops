import * as yup from "yup";

export const CreateProductSchema = yup.object({
    name: yup.string().min(5).required(),
    price: yup.number().moreThan(0, "Le prix doit être supérieur a 0").required("This field is required"),
    quantity: yup.number().min(0).required("This field is required"),
    categoryId: yup.string().required("This field is required"),
    pictureUrl: yup.string().optional().nullable(),
    showcase: yup.boolean().optional().nullable(),
    useInventory: yup.boolean().optional().nullable(),
    file: yup.mixed().when('pictureUrl', {
        is: (value: string) => !value,
        then: yup.mixed().required('Veuillez choisir une image')
    })
});

export const EditProductSchema = yup.object({
    name: yup.string().min(5).required(),
    price: yup.number().min(1).required("This field is required"),
    quantity: yup.number().min(1).required("This field is required"),
    categoryId: yup.string().min(1).required("This field is required"),
    showcase: yup.boolean().optional().nullable(),
    useInventory: yup.boolean().optional().nullable(),
});