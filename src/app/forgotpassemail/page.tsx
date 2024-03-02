"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import axios from "axios"
import toast from 'react-hot-toast';

const ForgotPassEmailPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("")

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const emailValidator = async () => {
        try {
            const response = await axios.post("/api/users/forgotpassemail", { email });

            toast.success("Password change link sent!")
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <hr />
            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="email"
            />

            <button
                onClick={emailValidator}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Enter Email
            </button>
        </div>
    )
}

export default ForgotPassEmailPage;