import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/auth');
  }

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}
