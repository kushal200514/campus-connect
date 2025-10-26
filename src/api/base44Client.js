// src/api/base44Client.js
export const base44 = {
  auth: {
    async me() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      return null;
    },
    async logout() {
      localStorage.removeItem('user');
      // FORCE a reload so context refreshes
      window.location.href = '/login';
    }
  }
};
