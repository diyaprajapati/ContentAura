import TypingAnimation from "@/components/ui/typing-animation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export default function Dashboard() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");

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

        const data = await response.json()
        setFirstname(data.firstname)
      } catch {
        localStorage.removeItem('token')
        navigate('/auth')
      }
    }

    fetchUserDetails()
  }, [navigate]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <TypingAnimation duration={100}>
          {('Welcome back, ' + firstname + '!') as unknown as string}
        </TypingAnimation>
      </div>
      <div>
        Here's a quick overview of your projects and activities.
      </div>
    </div>
  )
}
