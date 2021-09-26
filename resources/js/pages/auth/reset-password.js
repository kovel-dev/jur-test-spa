import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { resetPassword } from "../../api/auth";
import { Formik, Form, Field } from "formik";
import { schemaForResetPasswordForm } from "./schema";

function ResetPassword() {
    const token = useRouteMatch().params.token;

    const handleSubmit = value => {
        resetPassword({
            email: value.email,
            password: value.password,
            password_confirmation: value.passwordConfirmation,
            token
        })
            .then(status => {
                [
                    email,
                    password,
                    passwordConfirmation
                ].forEach(({ setValue }) => setValue(""));
                setPasswordResetFeedback(status);
            })
            .catch(error => {
                error.json().then(({ errors }) => {
                    setPasswordResetFeedback("");
                    [
                        email,
                        password,
                        passwordConfirmation
                    ].forEach(({ parseServerError }) =>
                        parseServerError(errors)
                    );
                });
            });
    };

    return (
        <div className="flex w-full min-h-screen">
            <div className="w-full max-w-lg left-side">
                <Link to="/">
                    <img
                        className="align-middle"
                        alt="jur_logo"
                        title="jur"
                        src="/images/Logo.png"
                    />
                </Link>
                <h2 className="mt-16">Become a modern arbitrator, Now.</h2>
                <div className="img-container">
                    <img src="/images/JUR.png" alt="jur" className="" />
                </div>
            </div>
            <div className="relative flex w-full right-side">
                <div className="absolute" style={{ top: 40, right: 72 }}>
                    <span className="text-opacity-md">
                        Never mind, <Link to="/login">Go back!</Link>
                    </span>
                </div>

                <div className="w-full max-w-lg m-auto form-wrapper">
                    <h3>Forgot Password</h3>
                    <p className="mt-2 text-opacity-sm">
                        Let’s get started with Jur{" "}
                    </p>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                            passwordConfirmation: ""
                        }}
                        validationSchema={schemaForResetPasswordForm}
                        validateOnMount
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, isValid }) => {
                            const disabled = !isValid || isSubmitting;
                            return (
                                <Form>
                                    <div className="mt-6">
                                        <Field
                                            component={InputField}
                                            label="Email Address"
                                            name="email"
                                            id="email"
                                            type="email"
                                        />
                                        <Field
                                            component={InputField}
                                            label="Password"
                                            name="password"
                                            id="password"
                                            type="password"
                                        />
                                        <Field
                                            component={InputField}
                                            label="Verify Password"
                                            name="passwordConfirmation"
                                            id="passwordConfirmation"
                                            type="password"
                                        />
                                    </div>

                                    <div className="mt-2 form-group">
                                        <button
                                            type="submit"
                                            className={`form-submit w-full ${
                                                disabled ? "disabled" : ""
                                            }`}
                                            disabled={disabled}
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
