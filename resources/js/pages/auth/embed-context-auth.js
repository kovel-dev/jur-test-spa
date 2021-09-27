import { useFormikContext } from "formik";
import React, { useEffect } from "react";

export function EmbedRegisterContext({ errs }) {
    const { setFieldError } = useFormikContext();

    useEffect(() => {
        if (Object.keys(errs).length > 0) {
            let { email, password } = errs;
            console.log(email, password);
            if (email.length > 0) {
                setFieldError("email", email[0]);
            }
            if (password.length > 0) {
                setFieldError("password", password[0]);
            }
        }
    }, [errs]);

    return null;
}

export function EmbedLoginContext({ errs }) {
    const { setFieldError } = useFormikContext();

    useEffect(() => {
        if (Object.keys(errs).length > 0) {
            let { email, password } = errs;
            console.log(email, password);
            if (email.length > 0) {
                setFieldError("email", email[0]);
            }
        }
    }, [errs]);

    return null;
}
