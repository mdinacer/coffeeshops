import * as yup from "yup";

export const loginValidationSchema = yup.object({

    username: yup.string().required("Le nom d'utilisateur est obligatoire"),
    password: yup
        .string()
        .required("Le mot de passe est obligatoire")
    ,
});

export const registerValidationSchema = yup.object({
    // profile: yup.object({
    //     firstName: yup.string().required("User full name is required"),
    //     lastName: yup.string().required("User full name is required"),
    // }),
    username: yup.string().required("Username is required"),
    email: yup.string().email().required("Ce Champ est obligatoire"),
    password: yup
        .string()
        .required("Password is required")
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            "Weak password"
        ),
    password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});
