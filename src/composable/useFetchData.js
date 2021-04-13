import { onBeforeMount, reactive, ref, watch } from 'vue';

export function useFetchData(
  fetch,
  query = {},
  options = { watchFilter: true, preloadData: true }
) {
  const filters = reactive({
    ...query,
    page: 1,
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

  if (options.watchFilter) {
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
  } else {
    watch(
      () => filters.page,
      () => fetchData()
    );

    watch(
      () => filters.size,
      () => fetchData()
    );
  }

  if (options.preloadData) onBeforeMount(() => fetchData());

  return { onPage, onFilter, totalRecords, filters, fetchData };
}
