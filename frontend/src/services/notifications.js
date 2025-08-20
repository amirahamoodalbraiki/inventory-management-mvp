import { api } from "./api";

export const notificationsService = {
  async list() {
    return api.get("/notifications"); // backend already mapped at /notifications
  },
  async markRead(id) {
    return api.put(`/notifications/${id}/read`);
  },
};
