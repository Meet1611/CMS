import api from "@/utils/axios";

export const doctorService = {
  getQueue: async () => {
    try {
      const response = await api.get("/doctor/queue");
      return response.data || [];
    } catch (error) {
      console.error("Error fetching doctor queue:", error);
      throw error;
    }
  },

  addPrescription: async (appointmentId, prescriptionData) => {
    try {
      console.log("Sending prescription data for appointment:", appointmentId, prescriptionData);
      const response = await api.post(`/prescriptions/${parseInt(appointmentId)}`, prescriptionData);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Backend error details:", error.response.data);
      }
      console.error("Error adding prescription:", error);
      throw error;
    }
  },

  addReport: async (appointmentId, reportData) => {
    try {
      console.log("Sending report data for appointment:", appointmentId, reportData);
      const response = await api.post(`/reports/${parseInt(appointmentId)}`, reportData);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Backend error details:", error.response.data);
      }
      console.error("Error adding medical report:", error);
      throw error;
    }
  }
};
