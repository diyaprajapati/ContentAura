import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export default function EditProfile() {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // fetch firstname from the backend
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
                setEmail(data.email)
            } catch {
                // localStorage.removeItem('token')
                navigate('/dashboard')
            }
        }

        fetchUserDetails()
    }, [navigate]);
    return (
        <div>
            <p>First name: {firstname}</p>
            <p>Last name: {lastname}</p>
            <p>Email: {email}</p>
        </div>
    )
}
