<template>
  <Card>
    <template #title> Conversions </template>
    <template #content>
      <DataTable
        :value="conversions"
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
        <Column field="offer_type" header="Offer type" />
        <Column field="status" header="Status" ref="status">
          <template #filter>
            <Dropdown
              :modelValue="getStatusObject(conversionStatuses, filters.status)"
              @update:modelValue="filters.status = $event.code"
              :options="conversionStatuses"
              optionLabel="name"
              placeholder="Status"
            />
          </template>
          <template #body="{ data }">
            <v-status :options="conversionStatuses" :code="data.status" />
          </template>
        </Column>

        <Column field="offer_id" header="Offer ID" />
        <Column field="conversion_id" header="Conversion ID" />
        <Column field="quantity" header="Quantity" />
        <Column field="customer_name" header="Name" />
        <Column field="customer_phone" header="Phone" />
        <Column field="reason" header="Reason" />
      </DataTable>
    </template>
  </Card>
</template>

<script>
import { ref } from 'vue';
import { consolidationService } from '@/services/consolidation';
import { useFetchData } from '@/composable/useFetchData';
import { useNotify } from '@/composable/useNotify';
import { useStatus } from '@/composable/useStatus';
import VStatus from '@/components/VStatus';

export default {
  components: {
    VStatus,
  },
  props: ['consolidation'],
  setup(props) {
    const conversions = ref([]);
    const loading = ref(false);
    const notify = useNotify();

    async function fetchData(query) {
      loading.value = true;
      try {
        const { data, meta } = await consolidationService.getConversions(
          props.consolidation.id,
          query
        );
        conversions.value = data;
        return meta.totalRows;
      } catch (e) {
        notify.error(e);
        return 0;
      } finally {
        loading.value = false;
      }
    }

    return {
      conversions,
      loading,
      ...useFetchData(fetchData, { start_date: '', end_date: '', status: '' }),
      ...useStatus(),
    };
  },
};
</script>
