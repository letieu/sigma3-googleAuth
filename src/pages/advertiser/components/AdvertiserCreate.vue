<template>
  <Dialog header="Header" v-model:visible="visible">
    <form class="p-fluid" @submit.prevent="submit()">
      <div class="p-field">
        <label> Consolidatin ID </label>
        <InputText type="text" v-model="payload.consolidationId" disabled />
      </div>
      <div class="p-field">
        <label> Created by </label>
        <InputText type="text" v-model="payload.createdBy" disabled />
      </div>
      <div class="p-field">
        <label for="firstname"> Due date </label>
        <v-date
          v-model="payload.dueDate"
          :class="{
            'p-invalid': validator.dueDate.$invalid && submitted,
          }"
        />
      </div>
      <div class="p-field">
        <Button label="Create" type="submit" :disabled="loading" />
      </div>
    </form>
  </Dialog>
</template>

<script>
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { advertiserService } from '@/services/advertiser';
import { useNotify } from '@/composable/useNotify';
import VDate from '@/components/VDate.vue';

export default {
  components: { VDate },
  setup() {
    const visible = ref(false);
    const submitted = ref(false);
    const authStore = useAuthStore();
    const loading = ref(false);
    const notify = useNotify();
    const payload = reactive({
      dueDate: '',
      consolidationId: '',
      createdBy: authStore.email,
    });
    function showDialog(id) {
      visible.value = true;
      payload.consolidationId = id;
    }

    const rules = { dueDate: { required } };
    const validator = useVuelidate(rules, payload);
    async function submit() {
      submitted.value = true;
      if (validator.value.$invalid) return;
      try {
        loading.value = true;
        await advertiserService.create(payload);
        notify.success();
      } catch (e) {
        notify.error(e);
      } finally {
        loading.value = false;
      }
    }

    return {
      visible,
      showDialog,
      payload,
      validator,
      submit,
      submitted,
      loading,
    };
  },
};
</script>
