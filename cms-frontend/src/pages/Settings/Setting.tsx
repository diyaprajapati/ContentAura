import { Settings } from "lucide-react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export default function Setting() {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    // fetch firstname and lastname from the backend
    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                navigate('/auth')
                return
            }

            try {
                const response = await fetch(`${API_URL}/api/auth/user-details`, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if (!response.ok) {
                    throw new Error()
                }

                const data = await response.json();
                setFirstname(data.firstname)
                setLastname(data.lastname)
            } catch {
                // localStorage.removeItem('token')
                navigate('/dashboard')
            }
        }

        fetchUserDetails()
    }, [navigate]);
    return (
        <div className="mx-10 my-4">
            <div className=" mb-4 flex gap-2">
                <Settings className="text-gray-300" />
                <div className="text-base font-medium text-gray-300">
                    Settings
                </div>
            </div>
            <hr />
            <div className="flex flex-row gap-1 text-2xl font-semibold mt-4">
                <div>
                    {firstname}
                </div>
                <div>
                    {lastname}
                </div>
            </div>
        </div>
    )
}
