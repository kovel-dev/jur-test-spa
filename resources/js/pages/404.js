import React from "react";
import AuthNav from "../components/auth-nav";
import { useAuth } from "../context/auth";

function NotFound() {
    let { authenticated } = useAuth();

    return (
        <div className="flex flex-col min-h-screen not-found">
            {authenticated ? <AuthNav /> : <div />}

            <div className="not-found-content">
                <div className="text-center">
                    <img src="/images/JUR.png" alt="" className="mx-auto" />
                    <h2 className="mt-8">Oops! Page Not Found</h2>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
