import React from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut, User as UserIcon, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getDashboardCards = () => {
    return [
      {
        title: "ORDERS",
        desc: "VIEW AND MANAGE RESTAURANT ORDERS.",
        action: "VIEW_LIST",
      },
      {
        title: "TABLES",
        desc: "MONITOR REAL-TIME TABLE STATUS.",
        action: "VIEW_MAP",
      },
      {
        title: "MENU",
        desc: "UPDATE PRICES AND AVAILABILITY.",
        action: "VIEW_EDIT",
      },
    ];
  };

  const navLinks = {
    admin: [
      { label: "My Clinic", href: "/admin" },
      { label: "Users", href: "/admin/users" },
    ],
    patient: [
      { label: "Dashboard", href: "/patient" },
      { label: "Book Appointment", href: "/patient/book" },
      { label: "My Appointments", href: "/patient/appointments" },
      { label: "My Prescription", href: "/patient/prescription" },
      { label: "My Reports", href: "/patient/reports" },
    ],
    doctor: [
      { label: "Today's Queue", href: "/doctor/queue" },
      { label: "Add Prescription", href: "/doctor/prescription" },
      { label: "Add Report", href: "/doctor/report" }
    ],
    receptionist: [
      { label: "Queue (manage)", href: "/receptionist/queue" },
      { label: "TV Display", href: "/receptionist/display" }
    ],
  };

  return (
    <div className="min-h-screen mb-[-2px] bg-white flex flex-col font-sans antialiased text-zinc-900">
      {/* Navigation Header */}
      <header className="bg-white border-b border-zinc-200 px-6 py-5 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black">Clinic Queue.</h1>
            <span className="text-[10px] text-zinc-300 font-bold px-2 py-0.5 border border-zinc-100">
              Clinic Management
            </span>
          </div>

          <div className="flex gap-3">
            {navLinks[user.role?.toLowerCase()]?.map((link) => {
              const isActive = link.href && location.pathname === link.href;

              return (
                <button
                  key={link.label}
                  onClick={() => navigate(link.href)}
                  className={`text-md font-semibold cursor-pointer px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-slate-50" : "hover:bg-slate-25"
                    }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={logout}
              className="flex items-center gap-2 text-md font-semibold cursor-pointer px-3 py-2 rounded-lg transition-colors"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {["/admin", "/patient", "/doctor", "/receptionist"].includes(
        location.pathname
      ) ? (
        <main className="flex-1 max-w-6xl mx-auto w-full p-6 md:p-10 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-zinc-100 text-left">
            <div className="space-y-4">
              <div className="inline-block py-1 px-3 bg-zinc-900 text-white text-[9px] font-black tracking-[0.3em]">
                AUTHENTICATED_SESSION
              </div>
              <div>
                <h2 className="text-4xl font-black tracking-tighter leading-none mb-2">
                  Hello,{" "}
                  {user.role?.toLowerCase() === "admin"
                    ? "Admin"
                    : user.role?.toLowerCase() === "patient"
                      ? "Patient"
                      : user.role?.toLowerCase() === "receptionist"
                        ? "Receptionist"
                        : "Doctor"}
                </h2>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="space-y-8 text-left">
            <div className="flex items-center">
              <h3 className="text-xs font-black tracking-[0.4em] text-zinc-300">
                CORE_MODULES
              </h3>
            </div>

          </div>              
        </main>
      ) : (
        <div className="min-w-6xl mx-auto mt-8">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
