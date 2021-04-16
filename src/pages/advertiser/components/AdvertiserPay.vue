<template>
  <div class="p-d-flex">
    <ProgressSpinner
      v-if="confirmLoading || payLoading"
      style="width: 30px; height: 30px"
    />
    <div v-else-if="payable">
      <Button
        label="Pay invoice"
        class="p-button-success"
        icon="pi pi-bill"
        @click="showPayment = true"
      />
      <Dialog header="Create payment" v-model:visible="showPayment">
        <form class="p-fluid" @submit.prevent="payInvoice()">
          <div class="p-field">
            <label for="type">Phương thức thanh toán</label>
            <InputText
              id="type"
              v-model="paymentData.payment_type"
              type="text"
              :class="{
                'p-invalid': validator.payment_type.$invalid && submitted,
              }"
            />
          </div>
          <div class="p-field">
            <label for="type">Ngày thanh toán</label>
            <v-date
              v-model="paymentData.payment_date"
              :class="{
                'p-invalid': validator.payment_date.$invalid && submitted,
              }"
            />
          </div>
          <div class="p-field">
            <label for="pay">Số tiền</label>
            <v-input-money
              id="pay"
              v-model="paymentData.payment"
              :class="{
                'p-invalid': validator.payment.$invalid && submitted,
              }"
            />
          </div>
          <div class="p-field">
            <label for="note">Ghi chú</label>
            <Textarea id="note" rows="5" cols="30" v-model="paymentData.note" />
          </div>

          <div class="p-field">
            <Button type="submit" label="Submit" :disabled="updating" />
            <ProgressSpinner
              v-if="payLoading"
              style="width: 30px; height: 30px"
            />
          </div>
        </form>
      </Dialog>
    </div>

    <div v-else-if="confirmable">
      <Button
        label="Confirm"
        icon="pi pi-check"
        class="p-button-warning"
        :disabled="updating"
        @click="confirm()"
      />
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import { useStatus } from '@/composable/useStatus';
import { useAuthStore } from '@/stores/auth';
import { useCurrencyStore } from '@/stores/currency';
import { useNotify } from '@/composable/useNotify';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { advertiserService } from '@/services/advertiser';
import VInputMoney from '@/components/VInputMoney.vue';
import VDate from '@/components/VDate.vue';

function useConfirm(advertiserId, reload) {
  const authStore = useAuthStore();
  const loading = ref(false);
  const notify = useNotify();
  const { advertiserStatuses } = useStatus();

  async function confirm() {
    loading.value = true;
    try {
      const { data } = await advertiserService.update(advertiserId.value, {
        status: advertiserStatuses[1].code,
        modified_by: authStore.email,
      });
      reload(data);
      notify.success();
    } catch (e) {
      notify.error(e);
    } finally {
      loading.value = false;
    }
  }

  return { confirm, confirmLoading: loading };
}

function usePay(advertiserId, reload) {
  const authStore = useAuthStore();
  const currencyStore = useCurrencyStore();
  const showPayment = ref(false);
  const notify = useNotify();
  const loading = ref(false);

  const paymentData = reactive({
    payment_type: '',
    payment_date: '',
    note: '',
    payment: null,
    created_by: authStore.email,
    currency: currencyStore.getCurrencyOption.name,
  });
  const rules = {
    payment_date: { required },
    payment_type: { required },
    payment: { required },
  };
  const validator = useVuelidate(rules, paymentData);
  const submitted = ref(false);

  async function payInvoice() {
    submitted.value = true;
    if (validator.value.$invalid) return;

    loading.value = true;
    try {
      const { data } = await advertiserService.pay(
        advertiserId.value,
        paymentData
      );

      reload(data);
      notify.success();
    } catch (e) {
      notify.error(e);
    } finally {
      loading.value = false;
    }
  }

  return {
    payInvoice,
    paymentData,
    showPayment,
    validator,
    submitted,
    payLoading: loading,
  };
}

export default {
  props: ['advertiser'],
  components: {
    VInputMoney,
    VDate,
  },
  setup(props, { emit }) {
    const { advertiserStatuses } = useStatus();
    const status = computed(() => props.advertiser?.status?.toString());
    const id = computed(() => props.advertiser?.id);
    const payable = computed(() =>
      [advertiserStatuses[1].code, advertiserStatuses[2].code].includes(
        status.value
      )
    );
    const confirmable = computed(
      () => advertiserStatuses[0].code == status.value
    );

    function reloadAdvertiser(data) {
      emit('update', data);
    }

    return {
      payable,
      confirmable,
      status,
      ...useConfirm(id, reloadAdvertiser),
      ...usePay(id, reloadAdvertiser),
    };
  },
};
</script>

<style></style>
