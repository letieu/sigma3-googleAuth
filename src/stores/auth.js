import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  // it is used in devtools and allows restoring state
  id: 'authStore',

  state: () => ({
    email: null,
    permissions: [],
  }),

  actions: {
    saveUser({ data }) {
      this.email = data?.email;
      this.permissions = data?.permissions;
    },

    async signOut() {
      var googleAuth = window.gapi.auth2.getAuthInstance();
      await googleAuth.disconnect();

      this.email = null;
      this.permissions = [];
    },
  },
});
