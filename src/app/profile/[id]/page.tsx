import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

export default function UserProfile({ params }: any) {
    const router = useRouter();
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile page <span className="p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span></p>
            <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold cursor-pointer py-2 px-4 rounded" onClick={logout}>Logout</button>
        </div>
    )
}