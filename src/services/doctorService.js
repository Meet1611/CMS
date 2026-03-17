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
      const response = await api.post(`/prescriptions/${appointmentId}`, prescriptionData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error adding prescription:", error);
      throw error;
    }
  },

  addReport: async (appointmentId, reportData) => {
    try {
      const response = await api.post(`/reports/${appointmentId}`, reportData);
      return response.data;
    } catch (error) {
      console.error("Error adding medical report:", error);
      throw error;
    }
  }
};
