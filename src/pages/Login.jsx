import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/context/AuthContext";
// import { login } from "@/services/authService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      console.log(result);


      if (!result.success) {
        setError(result.message || "Login failed");
      } else {
        const role = (result.user.role || result.user.UserRole)?.toLowerCase();
        console.log("Logged in role:", role);

        switch (role) {
          case "admin":
            navigate("/admin");
            break;
          case "patient":
            navigate("/patient");
            break;
          case "receptionist":
            navigate("/receptionist");
            break;
          case "doctor":
            navigate("/doctor");
            break;
          default:
            navigate("/");
        }
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <LoginForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Login;
