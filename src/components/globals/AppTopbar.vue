<template>
  <div class="layout-topbar">
    <button class="p-link layout-menu-button" @click="onMenuToggle">
      <span class="pi pi-bars"></span>
    </button>
    <div class="layout-topbar-icons">
      <Tag
        :value="currencyStore.getCurrencyOption.name"
        style="cursor: pointer"
        @click="currencyStore.switchCurrency"
      ></Tag>
    </div>
  </div>
</template>

<script>
import { useCurrencyStore, currencyList } from '@/stores/currency';

export default {
  setup() {
    const currencyStore = useCurrencyStore();
    return {
      currencyStore,
      currencyList,
    };
  },
  methods: {
    onMenuToggle(event) {
      this.$emit('menu-toggle', event);
    },
  },
};
</script>
