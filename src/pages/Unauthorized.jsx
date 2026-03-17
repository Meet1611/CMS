import { Link } from "react-router-dom";
import { ShieldX } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-md">

        <h1 className="text-5xl font-bold text-gray-800 mb-2">403</h1>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Access Denied
        </h2>

        <p className="text-gray-500 mb-8">
          You don't have permission to access this page. Please contact your
          administrator if you believe this is a mistake.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-5 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            Go Home
          </Link>

          <Link
            to="/login"
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
