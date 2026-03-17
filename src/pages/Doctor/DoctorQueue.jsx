import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Pill, FileText, AlertCircle } from "lucide-react";
import { doctorService } from "@/services/doctorService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DoctorQueue = () => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await doctorService.getQueue();
      setQueue(data);
    } catch (err) {
      setError("Failed to fetch today's queue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "waiting":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 uppercase text-[10px] font-black">waiting</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 uppercase text-[10px] font-black">in progress</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 uppercase text-[10px] font-black">completed</Badge>;
      case "skipped":
        return <Badge variant="outline" className="bg-zinc-100 text-zinc-600 border-zinc-200 uppercase text-[10px] font-black">skipped</Badge>;
      default:
        return <Badge variant="outline" className="uppercase text-[10px] font-black">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-3xl font-black tracking-tighter text-teal-900 px-2">Today's Queue</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="rounded-xl border-zinc-200 shadow-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-bold">Error fetching data</AlertTitle>
          <AlertDescription className="font-medium">{error}</AlertDescription>
        </Alert>
      )}

      <Card className="shadow-sm rounded-xl overflow-hidden border-zinc-100 bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-zinc-50/10 border-b border-zinc-100">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="h-14 pl-10 text-zinc-500 font-bold text-sm">Token</TableHead>
                <TableHead className="h-14 text-zinc-500 font-bold text-sm">Patient</TableHead>
                <TableHead className="h-14 text-zinc-500 font-bold text-sm">Status</TableHead>
                <TableHead className="h-14 text-zinc-500 font-bold text-sm">Appointment ID</TableHead>
                <TableHead className="h-14 pr-10 text-zinc-500 font-bold text-sm">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="animate-pulse border-zinc-50">
                    <TableCell colSpan={5} className="h-16 bg-zinc-50/20" />
                  </TableRow>
                ))
              ) : queue.length > 0 ? (
                queue.map((item) => (
                  <TableRow key={item.id} className="group border-zinc-100/50 hover:bg-zinc-50/30 transition-colors">
                    <TableCell className="pl-10 text-zinc-900 font-bold text-lg">
                      {item.tokenNumber}
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-zinc-800 text-lg">{item.patientName || "N/A"}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`rounded-lg border-none px-3 py-1 font-bold lowercase ${
                        item.status?.toLowerCase() === 'in_progress' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {item.status || "waiting"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-zinc-600 text-lg">{item.appointmentId}</span>
                    </TableCell>
                    <TableCell className="pr-10">
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={() => navigate(`/doctor/prescription?appointmentId=${item.appointmentId}`)}
                          className="rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 h-10 shadow-sm transition-all text-sm"
                        >
                          Add medicine
                        </Button>
                        <Button
                          onClick={() => navigate(`/doctor/report?appointmentId=${item.appointmentId}`)}
                          className="rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 h-10 transition-all text-sm"
                        >
                          Add report
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <ClipboardList className="text-zinc-200" size={40} />
                      <p className="text-zinc-400 font-bold">No patients in the queue</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorQueue;
