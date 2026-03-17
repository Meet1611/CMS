import api from "@/utils/axios";
import { createCrudService } from "./crudService";

export const appointmentService = {
    getAll: async () => {
        const response = await api.get("/appointments/my");
        console.log("Fetched appointments:", response.data);
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/appointments/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post("/appointments", data);
        return response.data;
    }
}