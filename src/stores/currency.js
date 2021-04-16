import { defineStore } from 'pinia';

export const currencyList = [
  { name: 'USD', code: '' },
  { name: 'VND', code: '_vnd' },
];

export const useCurrencyStore = defineStore({
  id: 'currencyStore',

  state: () => ({
    currency: window.localStorage.getItem('currency') || currencyList[0].code,
  }),

  getters: {
    getCurrencyOption() {
      return currencyList.find(item => item.code == this.currency);
    },
    isVND() {
      return this.currency == '_vnd';
    },
  },

  actions: {
    setCurrency(currencyOption) {
      this.currency = currencyOption.code;
      window.localStorage.setItem('currency', this.currency);
    },
    switchCurrency() {
      const currencyOption = currencyList.find(
        (item) => item.code != this.currency
      );
      this.setCurrency(currencyOption);
    },
  },
});
