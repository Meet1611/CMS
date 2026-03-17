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

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await api.get("/reports/my");
      console.log("Fetched reports:", response);
      if (response) {
        setReports(response.data);
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

  if (!reports.length) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-zinc-400 font-medium italic">
          No reports found.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">My Reports</h1>
      </div>

      <div className="rounded-2xl border grid grid-cols-3 gap-4 p-4">
        {reports.map((report) => (
          <Card
            key={report.id}
            className="border border-zinc-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300 max-w-sm"
          >
            <CardHeader className="bg-white px-5 py-2 border-b border-zinc-100">
              <CardTitle className="text-xl font-bold text-zinc-800 tracking-tight">
                Report {report.id}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-zinc-800 tracking-tight">
                Diagnosis
              </h2>
              <p className="text-zinc-700 font-medium whitespace-pre-wrap leading-relaxed">
                {report.diagnosis}
              </p>
              <h2 className="text-2xl font-bold text-zinc-800 tracking-tight">
                Test Recommended
              </h2>
              <p className="text-zinc-700 font-medium whitespace-pre-wrap leading-relaxed">
                {report.testRecommended}
              </p>
              <h2 className="text-2xl font-bold text-zinc-800 tracking-tight">
                Remarks
              </h2>
              <p className="text-zinc-700 font-medium whitespace-pre-wrap leading-relaxed">
                {report.remarks}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportList;
