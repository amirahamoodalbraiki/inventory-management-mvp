import { api } from "./api";
import { getUserId } from "./auth";

export const usersService = {
  async list() {
    return api.get("/users"); // expects [{id,name,email,role},...]
  },

  async create({ name, email, role, password }) {
    const body = {
      name,
      email,
      role: (role || "USER").toUpperCase(),  // ADMIN or USER
      passwordHash: password,                // backend expects raw password here
    };
    return api.postJson("/users", body);
  },

  async remove(id) {
    const myId = getUserId();
    if (myId && String(id) === String(myId)) {
      throw new Error("You can't delete your own account.");
    }
    return api.del(`/users/${id}`);
  },

  async getById(id) {
    return api.get(`/users/${id}`);
  },

  async update(id, payload) {
    const body = {
      name: payload.name,
      email: payload.email,
      role: (payload.role || "USER").toUpperCase(),
      // don't send password unless backend supports password updates
    };
    return api.putJson(`/users/${id}`, body);
  },
};