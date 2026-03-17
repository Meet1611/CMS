import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClipboardList } from "lucide-react";
import api from "@/utils/axios";

const QueueDisplay = () => {
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
      setQueue(response.data || []);
    } catch (err) {
      console.error("Error fetching queue:", err);
      setError("Failed to fetch queue data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black tracking-tighter text-zinc-800">TV display – Queue</h1>
      </div>

      <Card className="shadow-sm rounded-2xl overflow-hidden border-zinc-100 bg-white/50 backdrop-blur-sm">
        <CardContent className="px-8 py-6">
          <div className="max-w-xs space-y-2">
            <div className="flex items-center gap-3">
              <Label htmlFor="date-filter" className="text-lg font-bold text-zinc-600">Date</Label>
              <Input
                id="date-filter"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-xl border-zinc-200 focus:ring-zinc-900 font-bold text-zinc-800 h-11"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md rounded-3xl overflow-hidden border-none bg-white">
        <CardContent className="p-8">
          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 bg-zinc-50 animate-pulse rounded-2xl" />
              ))
            ) : queue.length > 0 ? (
              queue.map((item, index) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-6 p-4 rounded-2xl hover:bg-zinc-50/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center text-white font-black text-xl shadow-sm group-hover:scale-105 transition-transform">
                    {item.tokenNumber}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-zinc-800 tracking-tight">
                      {item.appointment?.patient?.name || "N/A"}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-50">
                  <ClipboardList className="text-zinc-300" size={40} />
                </div>
                <p className="text-zinc-500 text-xl font-medium">No patients in queue for today.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QueueDisplay;
