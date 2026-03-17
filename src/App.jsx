import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import UserList from "./pages/Admin/UserList";
import AppointmentList from "./pages/Patient/AppointmentList";
import BookAppointment from "./pages/Patient/BookAppointment";
import PrescriptionList from "./pages/Patient/PrescriptionList";
import ReportList from "./pages/Patient/ReportList";
import Appointment from "./pages/Patient/Appointment";
import QueueManagement from "./pages/Receptionist/QueueManagement";
import QueueDisplay from "./pages/Receptionist/QueueDisplay";
import DoctorQueue from "./pages/Doctor/DoctorQueue";
import AddPrescription from "./pages/Doctor/AddPrescription";
import AddReport from "./pages/Doctor/AddReport";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="users" element={<UserList />} />
        </Route>

        <Route
          path="/patient"
          element={
            <ProtectedRoute roles={["patient"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="book" element={<BookAppointment />} />
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="appointments/:id" element={<Appointment />} />
          <Route path="prescription" element={<PrescriptionList />} />
          <Route path="reports" element={<ReportList />} />
        </Route>

        <Route
          path="/receptionist"
          element={
            <ProtectedRoute roles={["receptionist"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="queue" element={<QueueManagement />} />
          <Route path="display" element={<QueueDisplay />} />
        </Route>

        <Route
          path="/doctor"
          element={
            <ProtectedRoute roles={["doctor"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="queue" element={<DoctorQueue />} />
          <Route path="prescription" element={<AddPrescription />} />
          <Route path="report" element={<AddReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
