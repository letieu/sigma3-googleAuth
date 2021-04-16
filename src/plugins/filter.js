import { useCurrencyStore } from '@/stores/currency';

const formatters = {
  vi: new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }),
  en: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }),
};

export default function initFilter(app) {
  app.config.globalProperties.$formatMoney = (object, key) => {
    const currencyStore = useCurrencyStore();
    const currency = currencyStore.currency;
    const value = object[key + currency];
    switch (currency) {
      case '_vnd':
        return formatters.vi.format(value);
      default:
        return formatters.en.format(value);
    }
  };
}
