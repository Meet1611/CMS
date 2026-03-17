import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { appointmentService } from "@/services/appointmentService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Appointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setLoading(true);
        const response = await appointmentService.getById(id);
        console.log("Fetched appointment:", response.data || response);
        setAppointment(response.data || response);
      } catch (err) {
        console.error("Error fetching appointment:", err);
        setError("Failed to load appointment details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAppointment();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  if (loading)
    return (
      <div className="p-8 text-center text-zinc-500 animate-pulse">
        Loading details...
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-red-500 font-semibold">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Retry
        </Button>
      </div>
    );
  if (!appointment)
    return (
      <div className="p-8 text-center text-zinc-500">
        Appointment not found.
      </div>
    );

  const { appointmentDate, timeSlot, queueEntry, prescription, report } =
    appointment;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-3 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tighter">
          Appointment details
        </h1>
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-all active:scale-95 shadow-sm border border-slate-200"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          <span className="font-bold text-sm">Back to appointments</span>
        </Button>
      </div>

      <Card className="border border-zinc-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardHeader className="bg-white px-5 py-2 border-b border-zinc-100">
          <CardTitle className="text-xl font-bold text-zinc-800 tracking-tight">
            Appointment
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-2 text-lg">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-zinc-500 text-sm tracking-wider">
                Date:
              </span>
              <span className="text-zinc-800 font-bold">
                {formatDate(appointmentDate)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-zinc-500 text-sm  tracking-wider">
                Time:
              </span>
              <span className="text-zinc-800 font-bold">{timeSlot}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-2 text-lg border-t border-zinc-50 pt-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-zinc-500 text-sm  tracking-wider">
                Token:
              </span>
              <span className="text-zinc-800 font-bold">
                {queueEntry?.tokenNumber || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-zinc-500 text-sm  tracking-wider">
                Status:
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-sm font-black border border-amber-200/50  tracking-tighter">
                {queueEntry?.status || appointment.status || "queued"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-zinc-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardHeader className="bg-white px-5 py-2 border-b border-zinc-100">
          <CardTitle className="text-xl font-bold text-zinc-800 tracking-tight">
            Medicines (Prescription)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!prescription ? (
            <p className="text-zinc-400 font-medium italic">
              No prescription added for this appointment yet.
            </p>
          ) : (
            <div className="prose prose-zinc max-w-none">
              {prescription.medicines?.map((medicine) => (
                <div key={medicine.id}>
                  <p className="text-zinc-700 font-medium whitespace-pre-wrap">
                    {medicine.name} - {medicine.dosage}
                  </p>
                  <p className="text-zinc-500 font-medium">
                    {medicine.duration}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border border-zinc-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardHeader className="bg-white px-5 py-2 border-b border-zinc-100">
          <CardTitle className="text-xl font-bold text-zinc-800 tracking-tight">
            Medical Report
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!report ? (
            <p className="text-zinc-400 font-medium italic">
              No report added for this appointment yet.
            </p>
          ) : (
            <div className="prose prose-zinc max-w-none">
              <p className="text-zinc-700 font-medium whitespace-pre-wrap leading-relaxed"></p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointment;
