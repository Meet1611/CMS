import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { appointmentService } from "@/services/appointmentService";

const timeSlots = [
  "09:00-09:15",
  "09:15-09:30",
  "09:30-09:45",
  "09:45-10:00",
  "10:00-10:15",
  "10:15-10:30",
  "10:30-10:45",
  "10:45-11:00",
  "11:00-11:15",
  "11:15-11:30",
  "11:30-11:45",
  "11:45-12:00",
  "12:00-12:15",
  "12:15-12:30",
  "12:30-12:45",
  "12:45-13:00",
  "13:00-13:15",
  "13:15-13:30",
  "13:30-13:45",
  "13:45-14:00",
  "14:00-14:15",
  "14:15-14:30",
  "14:30-14:45",
  "14:45-15:00",
  "15:00-15:15",
  "15:15-15:30",
  "15:30-15:45",
  "15:45-16:00",
];

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    appointmentDate: "",
    timeSlot: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await appointmentService.create(formData);
    //   console.log("Submitting appointment booking:", response.data);

      setLoading(false);
      setSuccess(true);
      setFormData({ appointmentDate: "", timeSlot: "" });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.log("creating appointmend error : ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="border shadow-lg bg-white/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold tracking-tight">
            <CalendarIcon size={20} />
            <CardTitle className="text-2xl">Book an Appointment</CardTitle>
          </div>
          <CardDescription>
            Choose your preferred date and time slot for your next visit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="appointmentDate"
                  className="text-sm font-semibold flex items-center gap-2"
                >
                  Select Date
                </Label>
                <div className="relative">
                  <Input
                    id="date"
                    name="appointmentDate"
                    type="date"
                    min={today}
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    className="pl-3 py-5 text-base border-zinc-200 focus:border-zinc-900 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="timeSlot"
                  className="text-sm font-semibold flex items-center gap-2"
                >
                  Select Time Slot
                </Label>
                <div className="relative">
                  <Select
                    value={formData.timeSlot}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, timeSlot: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {success && (
              <div className="p-3 bg-green-50 text-green-700 text-sm font-medium rounded-lg border border-green-200 animate-in zoom-in duration-300">
                Appointment request sent successfully! Our team will confirm
                shortly.
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white tracking-widest transition-all hover:scale-[1.01] active:scale-95 shadow-md"
            >
              <span className="text-white text-lg">
                {loading ? "Booking..." : "Book"}
              </span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookAppointment;
