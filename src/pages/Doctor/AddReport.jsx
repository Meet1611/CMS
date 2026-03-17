import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Save, ArrowLeft, AlertCircle, CheckCircle2, FlaskConical } from "lucide-react";
import { doctorService } from "@/services/doctorService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AddReport = () => {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    diagnosis: "",
    testRecommended: "",
    remarks: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await doctorService.addReport(appointmentId, formData);
      setSuccess(true);
      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      setError("Failed to save report. Please check the integrity of the input data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 my-4">
        <h1 className="text-3xl font-black tracking-tighter text-teal-900">Add Medical Report</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="rounded-xl border-zinc-200 shadow-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-bold">Error saving data</AlertTitle>
          <AlertDescription className="font-medium">{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="rounded-xl border-blue-100 bg-blue-50 text-blue-800 shadow-sm">
          <CheckCircle2 className="h-4 w-4 text-blue-600" />
          <AlertTitle className="font-bold">Data saved</AlertTitle>
          <AlertDescription className="font-medium">Medical report finalized and saved. Redirecting...</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Card className="shadow-sm rounded-xl overflow-hidden border-zinc-100 bg-white">
          <CardContent className="p-10 space-y-8 text-left">
            {success && (
              <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg font-bold text-sm mb-4">
                Report added.
              </div>
            )}
            
            <div className="space-y-2">
              <Label className="text-zinc-500 font-bold text-sm">Appointment ID</Label>
              <Input
                value={appointmentId || "From Today's Queue"}
                disabled
                className="rounded-lg border-zinc-200 bg-zinc-50 h-12 font-bold text-zinc-800"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-500 font-bold text-sm">Diagnosis *</Label>
              <Input
                name="diagnosis"
                placeholder="e.g. Viral Fever"
                value={formData.diagnosis}
                onChange={handleChange}
                required
                className="rounded-lg border-zinc-200 h-12 font-bold text-zinc-800"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-500 font-bold text-sm">Test recommended (optional)</Label>
              <Input
                name="testRecommended"
                placeholder="e.g. Blood Test"
                value={formData.testRecommended}
                onChange={handleChange}
                className="rounded-lg border-zinc-200 h-12 font-bold text-zinc-800"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-500 font-bold text-sm">Remarks (optional)</Label>
              <Textarea
                name="remarks"
                placeholder="e.g. Rest for 3 days"
                value={formData.remarks}
                onChange={handleChange}
                className="rounded-lg border-zinc-200 min-h-[120px] p-4 font-bold text-zinc-800"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold h-12 px-8 shadow-sm transition-all"
            >
              {loading ? "committing..." : "Save Report"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default AddReport;
