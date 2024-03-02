"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("");
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/user");
        console.log(res.data);
        setData(res.data.data._id);
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    useEffect(() => {
        if (data) {
            router.push(`/profile/${data}`);
        }
    }, [data]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <hr />
            <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold cursor-pointer py-2 px-4 rounded" onClick={logout}>Logout</button>
        </div>
    )
}