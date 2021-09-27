import React, { useState } from "react";
import { getIn } from "formik";
import { Link } from "react-router-dom";

function InputField({
    field,
    form,
    forgotPassword,
    label,
    type,
    helperText,
    serverError,
    ...rest
}) {
    const error = getIn(form.errors, field.name);
    const touched = getIn(form.touched, field.name);

    const [showHidePassword, changeShowHidePassword] = useState(false);

    const onToggleVisible = e => {
        e.preventDefault();
        changeShowHidePassword(!showHidePassword);
    };

    switch (type) {
        case "checkbox":
            return (
                <div className="form-group">
                    <input
                        type={type}
                        className="form-check"
                        {...field}
                        {...rest}
                    />{" "}
                    <label htmlFor={field.name}>{label}</label>
                </div>
            );
        default:
            return (
                <div className={`form-group`}>
                    {label && (
                        <div className="flex items-center justify-between">
                            <label htmlFor={field.name}>
                                {label}
                                <span className="required">*</span>
                            </label>
                            {forgotPassword && (
                                <Link to="/forgot-password">
                                    Forget Password?
                                </Link>
                            )}
                        </div>
                    )}
                    <div
                        className={`mt-2 ${
                            type == "password" ? "relative" : ""
                        }`}
                    >
                        <input
                            className={`form-input placeholder-opacity`}
                            type={showHidePassword ? "text" : type}
                            {...field}
                            {...rest}
                        />
                        {type == "password" && (
                            <button
                                className="absolute btn-toggle-visible"
                                onClick={onToggleVisible}
                                form="{}"
                            >
                                {showHidePassword ? "Hide" : "Show"}
                            </button>
                        )}
                    </div>
                    <span
                        className={`inline-block error ${
                            error && touched ? "visible" : "invisible"
                        }`}
                    >
                        {error ? error : "Error"}
                        {helperText}
                    </span>
                </div>
            );
    }
}

export default InputField;
