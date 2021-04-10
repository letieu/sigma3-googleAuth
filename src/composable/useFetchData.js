import { onBeforeMount, reactive, ref, watch } from 'vue';

export function useFetchData(fetch, query = {}) {
  const filters = reactive({
    ...query,
    page: 0,
    size: 20,
  });
  const totalRecords = ref();

  async function fetchData() {
    totalRecords.value = await fetch(filters);
  }

  const onPage = (page) => {
    filters.page = page.first / page.rows;
    filters.size = page.rows;
  };

  const onFilter = (keyEvent) => {
    const field = keyEvent.target.dataset.field;
    const value = keyEvent.target.value;
    filters[field] = value;
  };

  watch(
    () => ({ ...filters }),
    (val, old) => {
      if (val.page === old.page) {
        filters.page = 1;
      }
      fetchData();
    },
    { deep: true }
  );

  onBeforeMount(() => fetchData());

  return { onPage, onFilter, totalRecords, filters };
}
