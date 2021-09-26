import React from "react";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";

function Dashboard() {
    let { currentUser } = useAuth();

    return (
        <div className="flex main-content">
            <div className="w-full max-w-lg left-side">
                <h2 className="mt-16">Let's start</h2>
                <p className="mt-8">
                    Most of this information should already be present in your
                    arbitration agreement. In case it is not, you can refer to
                    the FAQ section to find out. The counter-party will also be
                    asked to mention their preference. The final decision will
                    be amicably made later by the arbitrator.
                </p>
            </div>
            <div className="relative flex w-full right-side">
                <div className="w-full">
                    <img
                        src="/images/Placeholder.png"
                        className="h-64 max-w-sm mx-auto"
                        alt=""
                    />
                    <div className="text-center">
                        <button className="mt-12 btn-started">
                            Let's Start
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
