import { boolean } from "yup";
import { object, string } from "yup";

export const schemaForRegisterForm = object().shape({
    fname: string().required("First Name is required."),
    lname: string().required("Last Name is required."),
    email: string().required("Email is required."),
    password: string().required("Password is required."),
    passwordConfirmation: string().required("Password is required."),
    agree_terms: boolean()
});

export const schemaForLoginForm = object().shape({
    email: string().required("Email is required."),
    password: string().required("Password is required."),
    remember_me: boolean()
});

export const schemaForForgotPasswordForm = object().shape({
    email: string().required("Email is required.")
});

export const schemaForResetPasswordForm = object().shape({
    email: string().required("Email is required."),
    password: string().required("Password is required."),
    passwordConfirmation: string().required("Password is required.")
});
