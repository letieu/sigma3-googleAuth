<template>
  <Card>
    <template #title> Advanced Card </template>
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
        <Column field="id" header="ID" ref="id">
          <template #body="slotProps">
            <router-link
              :to="{
                name: 'consolidation-detail',
                params: { id: slotProps.data.id },
              }"
            >
              {{ slotProps.data.id }}
            </router-link>
          </template>
        </Column>

        <Column
          field="advertiser_id"
          header="Advertiser ID"
          ref="advertiser_id"
        >
          <template #filter>
            <InputText
              type="text"
              class="p-column-filter"
              data-field="advertiser_id"
              @keyup.enter="onFilter"
              placeholder="Advertiser ID"
            />
          </template>
        </Column>

        <Column field="created_by" header="Created by" ref="created_by">
          <template #filter>
            <InputText
              type="text"
              class="p-column-filter"
              data-field="created_by"
              @keyup.enter="onFilter"
              placeholder="Created by"
            />
          </template>
        </Column>

        <Column field="start_date" header="Start - End" ref="start_date">
          <template #filter>
            <DateRange
              @update:start="filters.start_date = $event"
              @update:end="filters.end_date = $event"
            />
          </template>
          <template #body="slotProps">
            {{ slotProps.data.start_date }} -
            {{ slotProps.data.end_date }}
          </template>
        </Column>

        <Column field="status" header="Total payout" ref="status">
          <template #filter>
            <Dropdown
              :modelValue="
                getStatusObject(consolidationStatuses, filters.status)
              "
              @update:modelValue="filters.status = $event.code"
              :options="consolidationStatuses"
              optionLabel="name"
              placeholder="Status"
            />
          </template>
        </Column>

        <Column field="adflex_payout" header="Total payout" ref="adflex_payout">
        </Column>
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

export default {
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
