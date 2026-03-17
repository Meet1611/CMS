import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Phone, Play, SkipForward, RefreshCw, ClipboardList } from "lucide-react";
import api from "@/utils/axios";

const QueueManagement = () => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    fetchQueue();
  }, [selectedDate]);

  const fetchQueue = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/queue?date=${selectedDate}`);
      console.log("Fetched queue:", response.data);
      setQueue(response.data || []);
    } catch (err) {
      console.error("Error fetching queue:", err);
      setError("Failed to fetch queue data.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (tokenId, newStatus) => {
    try {
      // Assuming there's an endpoint to update status, e.g., PUT /queue/:id/status
      // For now, updating local state to reflect UI change as per user image
      // await api.put(`/queue/${tokenId}/status`, { status: newStatus });
      setQueue(prev => prev.map(item => 
        item.id === tokenId ? { ...item, status: newStatus } : item
      ));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "waiting":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">waiting</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">in progress</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">completed</Badge>;
      case "skipped":
        return <Badge variant="outline" className="bg-zinc-100 text-zinc-600 border-zinc-200">skipped</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black tracking-tighter">Queue (manage)</h1>
      </div>

      <Card className="shadow-sm rounded-lg overflow-hidden">
        <CardContent className="px-6 py-3">
          <div className="max-w-xs space-y-1">
            <Label htmlFor="date-filter" className="text-md font-black">Date</Label>
            <div className="relative">
              <Input
                id="date-filter"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-xl border-zinc-200 focus:ring-zinc-900 pr-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm rounded-lg overflow-hidden bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-zinc-50/50">
              <TableRow className="hover:bg-transparent border-zinc-100">
                <TableHead className="h-14 pl-8">Token</TableHead>
                <TableHead className="h-14">Patient</TableHead>
                <TableHead className="h-14">Phone</TableHead>
                <TableHead className="h-14">Time slot</TableHead>
                <TableHead className="h-14">Status</TableHead>
                <TableHead className="h-14 pr-8 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i} className="animate-pulse border-zinc-50">
                    <TableCell colSpan={6} className="h-16 bg-zinc-50/20" />
                  </TableRow>
                ))
              ) : queue.length > 0 ? (
                queue.map((item) => (
                  <TableRow key={item.id} className="group border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                    <TableCell className="font-black text-zinc-900 pl-8">{item.tokenNumber}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-800">{item.appointment?.patient?.name || "N/A"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-zinc-500">{item.appointment?.patient?.phone || "—"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-zinc-600 font-medium">
                        {item.appointment?.timeSlot || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="pr-8 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          onClick={() => updateStatus(item.id, "in_progress")}
                          variant="solid"
                          disabled={item.status === "in_progress"}
                          className="rounded-xl border-zinc-200 h-9 font-bold text-zinc-600 hover:bg-zinc-50 active:scale-95"
                        >
                          <span>In progress</span>
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => updateStatus(item.id, "skipped")}
                          className="rounded-xl border-zinc-200 h-9 font-bold text-zinc-600 hover:bg-zinc-50 active:scale-95"
                        >
                          Skip
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <ClipboardList className="text-zinc-200" size={40} />
                      <p className="text-zinc-500 font-medium">No appointments in queue for this date.</p>
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

export default QueueManagement;
