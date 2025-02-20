import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-extrabold">404 - Page Not Found</h1>
            <p className="mt-2 text-lg text-gray-400">Looks like you've ventured into the unknown digital realm.</p>
            <Link to="/dashboard" className="mt-4 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-800">
                Go to Home
            </Link>
        </div>
    )
}
