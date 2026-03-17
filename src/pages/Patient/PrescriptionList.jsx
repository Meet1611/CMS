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
import api from "@/utils/axios";

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const response = await api.get("/prescriptions/my");
      console.log("Fetched prescriptions:", response);
      if (response) {
        setPrescriptions(response.data);
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

  if (!prescriptions.length) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-zinc-400 font-medium italic">
          No prescriptions found.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">My Prescriptions</h1>
      </div>

      <div className="rounded-2xl border grid grid-cols-3 gap-4 p-4">
        {prescriptions.map((prescription) => (
          <Card
            key={prescription.id}
            className="border border-zinc-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300 max-w-sm"
          >
            <CardHeader className="bg-white px-5 py-2 border-b border-zinc-100">
              <CardTitle className="text-xl font-bold text-zinc-800 tracking-tight">
                Prescription {prescription.id}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-zinc-800 tracking-tight">
                Medicines
              </h2>
              <div>
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
              <h2 className="text-2xl font-bold text-zinc-800 tracking-tight">
                Instructions
              </h2>
              <p className="text-zinc-700 font-medium whitespace-pre-wrap leading-relaxed">
                {prescription.notes}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionList;
