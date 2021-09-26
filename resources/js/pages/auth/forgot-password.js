import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../api/auth";
import { Formik, Form, Field } from "formik";
import InputField from "../../components/form/InputField";
import { schemaForForgotPasswordForm } from "./schema";

function ForgotPassword() {
    let [resetFeedback, setResetFeedback] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        forgotPassword({ email: email.value })
            .then(status => setResetFeedback(status))
            .catch(error => {
                error.json().then(({ errors }) => {
                    email.parseServerError(errors);
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
                            remember_me: false
                        }}
                        validationSchema={schemaForForgotPasswordForm}
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
                                    </div>

                                    <div className="mt-2 form-group">
                                        <button
                                            type="submit"
                                            className={`form-submit w-full ${
                                                disabled ? "disabled" : ""
                                            }`}
                                            disabled={disabled}
                                        >
                                            Email me reset instructions
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

export default ForgotPassword;
