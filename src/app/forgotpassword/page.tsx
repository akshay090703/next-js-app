"use client"

import axios from "axios"
import Link from "next/link"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        password: "",
        repeatedPassword: "",
        token: "",
    });
    const [pwChanged, setPwChanged] = useState(false);
    const [error, setError] = useState(false)
    // const [matched, setMatched] = useState(false);

    // useEffect(() => {
    //     if (user.repeatedPassword === user.password && user.repeatedPassword.length > 0 && user.password.length > 0) {
    //         setMatched(true);
    //     } else {
    //         setMatched(false)
    //     }
    // }, [user.repeatedPassword, user.password])

    const resetPassword = async () => {
        if (user.token.length < 1) {
            const passToken = window.location.search.split("=")[1];
            setUser({ ...user, token: passToken });
        }

        if (user.token === "") {
            toast.error("No token found");
            return;
        }

        try {
            setLoading(true);
            await axios.post("/api/users/forgotpassword", user);
            toast.success("Password reset successfully");
            setPwChanged(true);
        } catch (error: any) {
            setError(true);
            toast.error(error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Reset Password"}</h1>
            <hr />

            <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="Password"
            />

            <label htmlFor="repeatedPassword">Repeat Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="password"
                id="repeatedPassword"
                name="repeatedPassword"
                value={user.repeatedPassword}
                onChange={(e) => setUser({ ...user, repeatedPassword: e.target.value })} placeholder="Repeat password"
            />

            <button
                onClick={resetPassword}
                className="p-2 cursor-pointer border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Change Password
            </button>

            {pwChanged &&
                <div className="flex flex-col items-center justify-center">
                    <p className="text-green-800 text-center text-2xl ">Password Successfully changed!</p>
                    <Link href="/login">Login Now</Link>
                </div>
            }

            {error && (
                <div>
                    <h2 className="text-2xl bh-red-500 text-black">An error occurred!</h2>
                </div>
            )}
        </div>
    )
}