<template>
  <InputNumber
    v-if="currencyStore.isVND"
    v-model="value"
    mode="currency"
    currency="VND"
    locale="vi-VN"
  />
  <InputNumber
    v-else
    v-model="value"
    mode="currency"
    currency="USD"
    locale="en-US"
  />
</template>

<script>
import { useCurrencyStore } from '@/stores/currency';
import { computed } from 'vue-demi';

export default {
  props: ['modelValue'],
  setup(props, { emit }) {
    const currencyStore = useCurrencyStore();
    const value = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });
    return { value, currencyStore };
  },
};
</script>

<style></style>
