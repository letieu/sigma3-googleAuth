<template>
  <div>
    <div v-if="loading">loading</div>
    <div v-if="error">{{ error }}</div>

    <div class="g-signin2" data-onsuccess="onSignIn"></div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import axios from 'axios';

function useGoogleLogin() {
  const loading = ref(false);
  const error = ref('');
  const authStore = useAuthStore();

  window.onSignIn = async (googleUser) => {
    try {
      loading.value = true;
      const id_token = googleUser.getAuthResponse().id_token;
      const { data } = await axios.post(process.env.VUE_APP_IAM_URL, {
        idToken: id_token,
      });

      const loginSuccess = data?.data?.email;

      if (!loginSuccess) logoutGoogle(data?.details || 'Unauthenticated');
      authStore.saveUser(data);
    } catch (e) {
      logoutGoogle(e.message);
    } finally {
      loading.value = false;
    }
  };

  async function logoutGoogle(errorMessage) {
    error.value = errorMessage;
    authStore.signOut();
  }

  function addMeta(googleClientId) {
    const meta = document.createElement('meta');
    meta.name = 'google-signin-client_id';
    meta.content = `${googleClientId}.apps.googleusercontent.com`;
    document.head.appendChild(meta);
  }

  function addScript() {
    const lib = document.createElement('script');
    lib.src = 'https://apis.google.com/js/platform.js';
    document.head.appendChild(lib);
  }

  onBeforeMount(() => {
    addMeta(process.env.VUE_APP_GOOGLE_ID);
    addScript();
  });

  return {
    loading,
    error,
  };
}

export default {
  setup() {
    return {
      ...useGoogleLogin(),
    };
  },
};
</script>
