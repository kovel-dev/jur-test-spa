import React, { useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/auth";
import { setIntendedUrl } from "../utils/auth";

function AuthNav() {
    let { setCurrentUser, setToken, currentUser } = useAuth();
    let history = useHistory();
    let [hideMobileNav, setHideMobileNav] = useState(true);

    const toggleMobileNav = () => setHideMobileNav(prevState => !prevState);
    const closeMobileNav = () => setHideMobileNav(true);

    const handleLogout = () => {
        setCurrentUser(null);
        setToken(null);
        history.push("/");
        setIntendedUrl(null);
    };

    return (
        <div className="flex flex-row h-16 border-b auth-nav border-grey-light">
            <div className="container flex flex-col items-center justify-between mx-auto auth-navbar lg:flex-row ">
                <div className="flex justify-between flex-1 w-full left lg:w-auto lg:flex-initial">
                    <ul className="flex items-center list-reset">
                        <li>
                            <NavLink
                                to="/"
                                activeClassName="font-bold"
                                className="text-gray-800 no-underline text-indigo"
                            >
                                <img src="/images/Logo.png" alt="" />
                            </NavLink>
                        </li>
                    </ul>

                    <div
                        onClick={toggleMobileNav}
                        id="sidebar-open"
                        className="z-50 flex items-center px-6 text-gray-700 lg:hidden"
                    >
                        <span
                            className={`svg-full ${
                                !hideMobileNav ? "mobile-nav-show" : ""
                            }`}
                        >
                            MENU &nbsp;
                            <svg
                                className="fill-current"
                                role="button"
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="12"
                                viewBox="0 0 35 12"
                            >
                                <rect width="35" height="2"></rect>
                                <rect y="5" width="24" height="2"></rect>
                                <rect y="10" width="14" height="2"></rect>
                            </svg>
                        </span>
                    </div>
                </div>

                <div
                    className={`right lg:flex pt-8 lg:pt-0 right fixed lg:relative bg-white w-full lg:w-auto h-screen lg:h-auto ${
                        hideMobileNav ? "mobile-hidden" : ""
                    }`}
                >
                    <ul className="flex flex-col items-center py-8 mt-8 lg:py-0 lg:mt-0 list-reset lg:flex-row">
                        <li
                            onClick={closeMobileNav}
                            className="px-4 py-3 lg:py-0"
                        >
                            <NavLink
                                to={`/dashboard`}
                                className="text-2xl font-bold text-gray-700 underline capitalize lg:text-sm lg:font-light lg:no-underline"
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li
                            onClick={handleLogout}
                            className="px-4 py-3 lg:py-0"
                        >
                            <Link
                                to="/logout"
                                className="flex items-center text-2xl font-bold text-gray-700 underline capitalize lg:text-sm lg:font-light lg:no-underline"
                            >
                                <span className="flex items-center justify-center mr-2 user-log">
                                    {currentUser.name.match(/\b(\w)/g).join("")}
                                </span>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AuthNav;
