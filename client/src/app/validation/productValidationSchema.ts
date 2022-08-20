import * as yup from "yup";

export const CreateProductSchema = yup.object({
    name: yup.string().min(5).required(),
    price: yup.number().moreThan(0, "Le prix doit être supérieur a 0").required("Ce champs est requis"),
    quantity: yup.number().min(0).default(0).required("Ce champs est requis"),
    categoryId: yup.string().required("Ce champs est requis"),
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
    price: yup.number().moreThan(0, "Le prix doit être supérieur a 0").required("Ce champs est requis"),
    quantity: yup.number().min(0).required("Ce champs est requis"),
    categoryId: yup.string().required("Ce champs est requis"),
    showcase: yup.boolean().optional().nullable(),
    useInventory: yup.boolean().optional().nullable(),
});