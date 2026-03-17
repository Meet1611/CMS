import api from "../utils/axios";

export const createCrudService = (endpoint) => {
  return {
    getAll: (params = {}) => {
      return api.get(endpoint, { params });
    },

    getById: (id) => {
      return api.get(`${endpoint}/${id}`);
    },

    create: (data) => {
      return api.post(endpoint, data);
    },

    update: (id, data) => {
      return api.patch(`${endpoint}/${id}`, data);
    },

    delete: (id) => {
      return api.delete(`${endpoint}/${id}`);
    },

    search: (query) => {
      return api.get(`${endpoint}/search`, { params: query });
    },

    paginate: (page, limit) => {
      return api.get(endpoint, { params: { page, limit } });
    },
  };
};
