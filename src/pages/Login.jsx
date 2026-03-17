// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await login(username, password);

//       if (!response.success) {
//         setError(response.message);
//       } else {
//         const role = response.user.UserRole;
//         console.log(role);

//         switch (role) {
//           case "manager":
//             navigate("/manager");
//             break;
//           case "waiter":
//             navigate("/waiter");
//             break;
//           case "chef":
//             navigate("/chef");
//             break;
//           case "cashier":
//             navigate("/cashier");
//             break;
//           default:
//             navigate("/");
//         }
//       }
//     } catch (err) {
//       setError("Login failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen mb-[-2px] flex items-center justify-center bg-zinc-50 p-4 font-sans antialiased text-zinc-900 uppercase">
//       <div className="w-full max-w-sm bg-white border border-zinc-200 p-8 pt-10 pb-10 shadow-sm">
//         <div className="text-center mb-10">
//           <h1 className="text-xl font-black tracking-tighter mb-1">AUTH.</h1>
//           <p className="text-[10px] text-zinc-400 font-bold tracking-[0.2em]">ENTER CREDENTIALS</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-1.5">
//             <label className="text-[10px] font-black text-zinc-500 tracking-widest leading-none">USERNAME</label>
//             <input
//               type="text"
//               placeholder="J_DOE"
//               className="w-full px-0 py-2 bg-transparent border-b-2 border-zinc-100 outline-none focus:border-zinc-900 transition-all text-sm placeholder:text-zinc-200"
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           <div className="space-y-1.5">
//             <label className="text-[10px] font-black text-zinc-500 tracking-widest leading-none">PASSWORD</label>
//             <input
//               type="password"
//               placeholder="••••••••"
//               className="w-full px-0 py-2 bg-transparent border-b-2 border-zinc-100 outline-none focus:border-zinc-900 transition-all text-sm placeholder:text-zinc-200"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {error && (
//             <div className="p-3 bg-zinc-900 text-white text-[10px] font-bold tracking-widest">
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-400 text-white text-[11px] font-black tracking-[0.3em] transition-all"
//           >
//             {isLoading ? "PROCESSING..." : "SIGN_IN"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

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
