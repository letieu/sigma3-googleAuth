<template>
  <div class="p-d-flex p-ai-center p-jc-center" style="height: 100vh">
    <Card style="width: 35em" class="p-shadow-20">
      <template #header>
        <img
          src="https://www.primefaces.org/wp-content/uploads/2020/02/primefacesorg-primevue-2020.png"
        />
      </template>
      <template #title> Advanced Card </template>
      <template #subtitle> Card subtitle </template>
      <template #content>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
        </p>
      </template>
      <template #footer>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
        <ProgressSpinner v-if="loading" />
        <Message v-if="error" severity="error">{{ error }}</Message>
      </template>
    </Card>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
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
