import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { appointmentService } from "@/services/appointmentService";
import { useNavigate } from "react-router-dom";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await appointmentService.getAll();
      console.log("Fetched appointments:", response);
      if (response) {
        setAppointments(response || response.data);
      } else {
        setError(response.data?.message || "Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Fetch appointments error:", error);
      setError("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">My Appointments</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-background sticky top-0">
              <TableHead>Date</TableHead>
              <TableHead className="w-25">Time</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{formatDate(appointment.appointmentDate)}</TableCell>
                <TableCell className="font-medium">
                  {appointment.timeSlot}
                </TableCell>
                <TableCell>{appointment.queueEntry?.tokenNumber}</TableCell>
                <TableCell>
                  <span
                    className={
                      "bg-green-200 px-2 py-1 rounded-md text-green-600 font-medium"
                    }
                  >
                    {appointment.queueEntry?.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() =>
                      navigate(`/patient/appointments/${appointment.id}`)
                    }
                  >
                    <span className="text-white">Medicines & Report</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppointmentList;
