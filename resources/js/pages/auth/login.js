import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useAuth } from "../../context/auth";
import { login } from "../../api/auth";
import { getIntendedUrl } from "../../utils/auth";
import InputField from "../../components/form/InputField";
import { schemaForLoginForm } from "./schema";
import { EmbedLoginContext } from "./embed-context-auth";

function Login() {
    let { setCurrentUser, setToken } = useAuth();
    let history = useHistory();

    const [errors, setErrors] = useState({});

    const handleSubmit = value => {
        login({
            email: value.email,
            password: value.password
        })
            .then(({ user, token }) => {
                setToken(token);
                setCurrentUser(user);
                history.push(getIntendedUrl());
            })
            .catch(error => {
                error.json().then(({ errors }) => setErrors(errors));
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
                        New to Jur? <Link to="/register">Sign Up</Link>
                    </span>
                </div>
                <div className="w-full max-w-lg m-auto form-wrapper">
                    <h3>Sign In</h3>
                    <p className="mt-2 text-opacity-sm">
                        Let’s get started with Jur{" "}
                    </p>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                            remember_me: false
                        }}
                        validationSchema={schemaForLoginForm}
                        validateOnMount
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, isValid }) => {
                            const disabled = !isValid || isSubmitting;
                            return (
                                <Form>
                                    <div className="mt-4">
                                        <Field
                                            component={InputField}
                                            label="Email Address"
                                            name="email"
                                            id="email"
                                            type="email"
                                            serverError={errors}
                                        />
                                    </div>
                                    <Field
                                        component={InputField}
                                        label="Password"
                                        name="password"
                                        forgotPassword={true}
                                        id="password"
                                        type="password"
                                    />
                                    <div className="mt-1">
                                        <Field
                                            component={InputField}
                                            label="Remember Me"
                                            name="remember_me"
                                            id="remember_me"
                                            type="checkbox"
                                        />
                                    </div>

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
                                    <EmbedLoginContext errs={errors} />
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Login;
