import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useAuth } from "../../context/auth";
import { register } from "../../api/auth";
import InputField from "../../components/form/InputField";
import { schemaForRegisterForm } from "./schema";

function Register() {
    let history = useHistory();
    let { setCurrentUser, setToken } = useAuth();

    const handleSubmit = value => {
        console.log(value);
        register({
            name: value.fname + " " + value.lname,
            email: value.email,
            password: value.password,
            password_confirmation: value.passwordConfirmation
        })
            .then(({ user, token }) => {
                setCurrentUser(user);
                setToken(token);
                history.push("/dashboard");
            })
            .catch(error => {
                error.json().then(({ errors }) => {
                    [
                        email,
                        fname,
                        lname,
                        password
                    ].forEach(({ parseServerError }) =>
                        parseServerError(errors)
                    );
                });
            });
    };

    return (
        <div className="flex w-full min-h-screen auth-content">
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
                        Already a member? <Link to="/login">Sign In</Link>
                    </span>
                </div>
                <div className="w-full max-w-lg m-auto form-wrapper">
                    <h3>Sign Up</h3>
                    <p className="mt-2 text-opacity-sm">
                        Let’s get started with Jur{" "}
                    </p>
                    <Formik
                        initialValues={{
                            fname: "",
                            lname: "",
                            email: "",
                            password: "",
                            passwordConfirmation: "",
                            agree_terms: false
                        }}
                        validationSchema={schemaForRegisterForm}
                        validateOnMount
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, isValid, values }) => {
                            const disabled =
                                !isValid || isSubmitting || !values.agree_terms;
                            return (
                                <Form>
                                    <div className="grid items-end grid-cols-1 gap-6 mt-6 md:grid-cols-2">
                                        <Field
                                            component={InputField}
                                            label="Full Name"
                                            name="fname"
                                            placeholder="First Name"
                                            id="fname"
                                            type="text"
                                        />
                                        <Field
                                            component={InputField}
                                            label=""
                                            name="lname"
                                            placeholder="Last Name"
                                            id="lname"
                                            type="text"
                                        />
                                    </div>
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
                                    <Field
                                        component={InputField}
                                        label={
                                            <>
                                                I agree to the{" "}
                                                <Link to="/">terms</Link> and{" "}
                                                <Link to="/">conditions</Link>
                                            </>
                                        }
                                        name="agree_terms"
                                        id="agree_terms"
                                        type="checkbox"
                                    />

                                    <div className="mt-6 form-group">
                                        <button
                                            type="submit"
                                            className={`form-submit ${
                                                disabled ? "disabled" : ""
                                            }`}
                                            disabled={disabled}
                                        >
                                            Sign In
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

export default Register;
