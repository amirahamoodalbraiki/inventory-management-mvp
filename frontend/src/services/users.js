import { api } from "./api";

// TEMP: if your backend isn’t ready, return mock data
const MOCK = [
  { id: 1, name: "Admin User", email: "admin@example.com", role: "ADMIN" },
  { id: 2, name: "John Doe",  email: "john@example.com",  role: "STAFF"  },
  { id: 3, name: "Sara Park", email: "sara@example.com",  role: "STAFF"  },
];

export const usersService = {
  async list() {
    try {
      return await api.get("/users"); // expects [{id,name,email,role},...]
    } catch {
      return MOCK; // fallback for now
    }
  },
  async remove(id) {
    try {
      await api.del(`/users/${id}`);
    } catch (e) {
      // if backend isn’t ready, just pretend
      return true;
    }
  },
};