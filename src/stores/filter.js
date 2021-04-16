import { defineStore } from 'pinia';

export const useFilterStore = defineStore({
  id: 'filter',

  state: () => ({
    filters: [{ key: 'example', value: { name: '' } }],
  }),

  actions: {
    getFilter(key) {
      return this.filters.find(filter => filter.key == key)?.value;
    },
    cacheFilter(key, value) {
      const filterIndex = this.filters.findIndex(filter => filter.key == key);
      if (filterIndex == -1) {
        this.filters.push({ key, value });
      } else {
        this.filters[filterIndex].value = value;
      }
    },
  },
});
