import { api } from "./api";

export const notificationsService = {
  async list() {
    // Backend can return: [{id,type,message,createdAt,read,actor:{name,avatarUrl}}]
    return api.get("/notifications");
  },
  async markRead(id) {
    // Implement if backend supports it; otherwise just return true.
    // return api.postJson(`/notifications/${id}/read`, {});
    return true;
  },
  async markAllRead() {
    // return api.postJson(`/notifications/read-all`, {});
    return true;
  },
};