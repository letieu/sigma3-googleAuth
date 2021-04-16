<template>
  <div>
    <Toolbar class="p-mb-2">
      <template #right>
        <Button
          label="New"
          icon="pi pi-plus"
          class="p-button-success p-mr-2"
          @click="$router.push({ name: 'consolidation-create' })"
        />
      </template>
    </Toolbar>
    <DataTable
      :value="consolidations"
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

      <Column field="advertiser_id" header="Advertiser ID" ref="advertiser_id">
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
            v-model:start="filters.start_date"
            v-model:end="filters.end_date"
          />
        </template>
        <template #body="slotProps">
          {{ slotProps.data.start_date }} -
          {{ slotProps.data.end_date }}
        </template>
      </Column>

      <Column field="status" header="Status" ref="status">
        <template #filter>
          <Dropdown
            :modelValue="getStatusObject(consolidationStatuses, filters.status)"
            @update:modelValue="filters.status = $event.code"
            :options="consolidationStatuses"
            optionLabel="name"
            placeholder="Status"
          />
        </template>
        <template #body="{ data }">
          <v-status :options="consolidationStatuses" :code="data.status" />
        </template>
      </Column>

      <Column field="adflex_payout" header="Total payout" ref="adflex_payout">
        <template #body="{ data }">
          {{ $formatMoney(data, 'adflex_payout') }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { ref } from 'vue';
import { consolidationService } from '@/services/consolidation';
import { useFetchData } from '@/composable/useFetchData';
import { useNotify } from '@/composable/useNotify';
import { useStatus } from '@/composable/useStatus';
import { TDate } from '@/helper';
import DateRange from '@/components/DateRange.vue';
import VStatus from '@/components/VStatus.vue';

export default {
  components: {
    DateRange,
    VStatus,
  },
  setup() {
    const consolidations = ref([]);
    const loading = ref(false);
    const notify = useNotify();
    const params = {
      start_date: TDate.today(),
      end_date: TDate.today(),
      status: '',
    };

    async function fetchData(query) {
      loading.value = true;
      try {
        const { data, meta } = await consolidationService.getAll(query);
        consolidations.value = data;
        return meta.totalRows;
      } catch (e) {
        notify.error(e);
        return 0;
      } finally {
        loading.value = false;
      }
    }

    return {
      consolidations,
      loading,
      ...useFetchData(fetchData, params),
      ...useStatus(),
    };
  },
};
</script>
