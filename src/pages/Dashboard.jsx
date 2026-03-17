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
    doctor: [{ label: "My Appointments", href: "/doctor" }],
    receptionist: [{ label: "Queue (manage)", href: "/receptionist/queue" }],
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
                <p className="text-xs text-zinc-400 font-bold tracking-widest max-w-md">
                  ROLE: {user?.role || "UNDEFINED"} // SYSTEM_ONLINE
                </p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-zinc-100 border border-zinc-100">
              {/* {getDashboardCards().map((card, index) => (
              <div 
                key={index}
                className="group bg-white p-8 hover:bg-zinc-50 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-lg font-black tracking-tighter text-zinc-900">{card.title}</h4>
                  <div className="w-2 h-2 rounded-full bg-zinc-200 group-hover:bg-zinc-900 transition-colors"></div>
                </div>
                <p className="text-[11px] font-bold text-zinc-400 tracking-wide mb-8 leading-relaxed">
                  {card.desc}
                </p>
                <div className="flex items-center text-zinc-900 font-black text-[10px] tracking-widest">
                  <span>{card.action}</span>
                  <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))} */}
            </div>
          </div>

          {/* Recent Activity Section */}
          {/* <div className="space-y-6 text-left">
          <h3 className="text-xs font-black tracking-[0.4em] text-zinc-300">
            SYSTEM_LOGS
          </h3>
          <div className="space-y-px bg-zinc-100 border border-zinc-100">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-6 bg-white hover:bg-zinc-50 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <span className="text-[10px] tabular-nums font-black text-zinc-200">
                    0{i}
                  </span>
                  <div>
                    <p className="text-[11px] font-black text-zinc-900 tracking-wide">
                      SYSTEM_UPDATE_STABLE
                    </p>
                    <p className="text-[9px] text-zinc-400 font-bold mt-1 tracking-widest">
                      TS: 2026.03.17_10:45
                    </p>
                  </div>
                </div>
                <div className="text-[9px] font-black text-zinc-900 border border-zinc-100 px-2 py-1">
                  OK_STATUS
                </div>
              </div>
            ))}
          </div>
        </div> */}
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
