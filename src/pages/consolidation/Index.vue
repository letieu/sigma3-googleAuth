<template>
  <div>
    <DataTable
      :value="customers"
      :lazy="true"
      :loading="loading"
      filterDisplay="row"
      @page="onPage"
      :rowsPerPageOptions="[10, 20, 50]"
      :rows="filters.size"
      :paginator="true"
      :totalRecords="totalRecords"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      responsiveLayout="scroll"
    >
      <Column field="name" header="Name" ref="name">
        <template #filter>
          <InputText
            type="text"
            class="p-column-filter"
            data-field="name"
            @keyup.enter="onFilter"
            placeholder="Search by name"
          />
        </template>
        <template #body="slotProps">
          <router-link :to="{ name: 'consolidation-detail', params: { id: 'asdfff' } }">
            {{ slotProps.data.name }}
          </router-link>
        </template>
      </Column>

      <Column field="name" header="Name" ref="name">
        <template #filter>
          <InputText
            type="text"
            class="p-column-filter"
            data-field="name"
            @keyup.enter="onFilter"
            placeholder="Search by name"
          />
        </template>
      </Column>

      <Column field="name" header="Name" ref="name">
        <template #filter>
          <InputText
            type="text"
            class="p-column-filter"
            data-field="name"
            @keyup.enter="onFilter"
            placeholder="Search by name"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { ref } from 'vue';
import CustomerService from '@/service/CustomerService';
import { useFetchData } from '@/composable/useFetchData';

export default {
  setup() {
    const customers = ref([]);
    const customerService = new CustomerService();
    const loading = ref(false);

    async function fetchData(query) {
      loading.value = true;
      const data = await customerService.getCustomers(query);
      customers.value = data.customers;
      loading.value = false;

      return data.totalRecords;
    }

    return {
      customers,
      loading,
      ...useFetchData(fetchData, { name: '' }),
    };
  },
};
</script>
