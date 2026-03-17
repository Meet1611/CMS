import React, { useState, useEffect } from "react";
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
import { Plus, Trash2, Save, ArrowLeft, Pill, AlertCircle, CheckCircle2 } from "lucide-react";
import { doctorService } from "@/services/doctorService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AddPrescription = () => {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");
  const navigate = useNavigate();

  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", duration: "" },
  ]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addMedicineRow = () => {
    setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
  };

  const removeMedicineRow = (index) => {
    if (medicines.length > 1) {
      const newMedicines = medicines.filter((_, i) => i !== index);
      setMedicines(newMedicines);
    }
  };

  const handleMedicineChange = (index, field, value) => {
    const newMedicines = [...medicines];
    newMedicines[index][field] = value;
    setMedicines(newMedicines);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Sanitize medicines: remove any empty rows
    const sanitizedMedicines = medicines.filter(med => med.name.trim() !== "");

    if (sanitizedMedicines.length === 0) {
      setError("Please add at least one medicine.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        medicines: sanitizedMedicines,
        notes: notes.trim()
      };
      console.log("Submitting prescription payload:", payload);
      await doctorService.addPrescription(appointmentId, payload);
      setSuccess(true);
      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || "Failed to save prescription. Backend returned a validation error (400).";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 my-4">
        <h1 className="text-3xl font-black tracking-tighter text-teal-900">Add Prescription</h1>
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
          <AlertDescription className="font-medium">Prescription recorded successfully. Redirecting...</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Card className="shadow-sm rounded-xl overflow-hidden border-zinc-100 bg-white">
          <CardContent className="p-10 space-y-8 text-left">
            <div className="space-y-2">
              <Label className="text-zinc-500 font-bold text-sm">Appointment ID</Label>
              <Input
                value={appointmentId || ""}
                disabled
                className="rounded-lg border-zinc-200 bg-zinc-50 h-12 font-bold text-zinc-800"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-zinc-500 font-bold text-sm">Medicines</Label>
              
              <div className="grid grid-cols-12 gap-4 px-1">
                <div className="col-span-5 text-xs font-bold text-zinc-400">Name</div>
                <div className="col-span-3 text-xs font-bold text-zinc-400">Dosage</div>
                <div className="col-span-3 text-xs font-bold text-zinc-400">Duration</div>
              </div>

              {medicines.map((med, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5">
                    <Input
                      placeholder="e.g. Paracetamol"
                      value={med.name}
                      onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                      required
                      className="rounded-lg border-zinc-200 h-12 font-bold text-zinc-800"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      placeholder="e.g. 500mg"
                      value={med.dosage}
                      onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
                      required
                      className="rounded-lg border-zinc-200 h-12 font-bold text-zinc-800"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      placeholder="e.g. 5 days"
                      value={med.duration}
                      onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
                      required
                      className="rounded-lg border-zinc-200 h-12 font-bold text-zinc-800"
                    />
                  </div>
                  <div className="col-span-1 text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeMedicineRow(index)}
                      disabled={medicines.length === 1}
                      className="h-10 w-10 p-0 text-zinc-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addMedicineRow}
                className="rounded-lg border-zinc-200 hover:bg-zinc-50 text-zinc-600 font-bold h-10 px-4 mt-2"
              >
                <Plus size={16} className="mr-2" />
                Add medicine
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-500 font-bold text-sm">Notes (optional)</Label>
              <Textarea
                placeholder="e.g. After food"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="rounded-lg border-zinc-200 min-h-[120px] p-4 font-bold text-zinc-800"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold h-12 px-8 shadow-sm transition-all"
            >
              {loading ? "committing..." : "Save Prescription"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default AddPrescription;
