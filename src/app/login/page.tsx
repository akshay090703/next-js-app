"use client"; // makes it a client component
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from 'react-hot-toast';

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);

            console.log("Login Success", response.data);
            toast.success("Login Successful");
            router.push("/profile")
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    const forgotPassword = async () => {
        // sending verification email
        router.push("/forgotpassemail");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Log in"}</h1>
            <hr />
            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text"
                id="email"
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="email"
            />

            <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="password"
            />

            <button
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login
            </button>

            <button
                onClick={forgotPassword}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Forgot Password
            </button>

            <Link href="/signup">SignUp Here</Link>

        </div>
    )
}

export default LoginPage;