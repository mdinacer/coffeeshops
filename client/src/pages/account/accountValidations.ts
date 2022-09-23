import * as yup from "yup";

export const loginValidationSchema = yup.object({

    email: yup.string().email().required("Le nom d'utilisateur est obligatoire"),
    password: yup
        .string()
        .required("Le mot de passe est obligatoire")
    ,
});

export const registerValidationSchema = yup.object({
    displayName: yup.string().required("Username is required"),
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

export const passwordResetValidationSchema = yup.object({
    password: yup
        .string()
        .required("Le mot de passe ne peut être vide")
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            "Le mot de passe doit contenir au minimum 8 caractères, à savoir : au moins une lettre minuscule et une lettre majuscule et un chiffre."
        ),
    password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
    // email: yup.string().email().required("Ce Champ est obligatoire"),
});

export const emailChangeValidationSchema = yup.object({
    password: yup
        .string()
        .required("Le mot de passe ne peut être vide")
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            "Le mot de passe doit contenir au minimum 8 caractères, à savoir : au moins une lettre minuscule et une lettre majuscule et un chiffre."
        ),
    password2: yup.string().oneOf([yup.ref('password'), null], 'Le mot de passe doit être identique')
});

export const shopUserValidationSchema = yup.object({
    displayName: yup.string().required("Username is required"),
    username: yup.string().required("Username is required"),
    password: yup
        .string()
        .required("Password is required")
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            "Weak password"
        ),
});
