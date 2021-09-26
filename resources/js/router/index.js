import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import ForgotPassword from "../pages/auth/forgot-password";
import ResetPassword from "../pages/auth/reset-password";
import NotFound from "../pages/404";
import Dashboard from "../pages/dashboard";
import AuthRoute from "./auth-route";
import GuestRoute from "./guest-route";
import { useAuth } from "../context/auth";
import FullPageSpinner from "../components/full-page-spinner";

function App() {
    let { initializing } = useAuth();
    return initializing ? (
        <FullPageSpinner />
    ) : (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Switch>
                    <GuestRoute exact path="/">
                        <Redirect to="/login" />
                    </GuestRoute>
                    <GuestRoute
                        path="/register"
                        component={Register}
                        title="Register"
                    />
                    <GuestRoute
                        exact
                        path="/login"
                        component={Login}
                        title="Login"
                    />
                    <GuestRoute
                        path="/forgot-password"
                        component={ForgotPassword}
                        title="Forgot password"
                    />
                    <GuestRoute
                        path="/password/reset/:token"
                        component={ResetPassword}
                        title="Reset password"
                    />
                    <AuthRoute
                        path="/dashboard"
                        component={Dashboard}
                        title="Dashboard"
                    />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
