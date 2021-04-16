<template>
  <div>
    <DataTable
      :value="advertisers"
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
      <Column field="advertiser_id" header="Advertiser ID">
        <template #filter>
          <InputText
            type="text"
            class="p-column-filter"
            data-field="advertiser_id"
            @keyup.enter="onFilter"
            placeholder="Advertiser ID"
          />
        </template>
        <template #body="slotProps">
          <router-link
            :to="{
              name: 'advertiser-detail',
              params: { id: slotProps.data.id },
            }"
          >
            {{ slotProps.data.advertiser_id }}
          </router-link>
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

      <Column field="due_date" header="Due date" />

      <Column field="adflex_payout" header="Tổng tiền thanh toán">
        <template #body="{ data }">
          {{ $formatMoney(data, 'adflex_payout') }}
        </template>
      </Column>

      <Column field="adflex_payout" header="Tổng tiền còn lại">
        <template #body="{ data }">
          {{ $formatMoney(data, 'adflex_payout') }}
        </template>
      </Column>

      <Column field="adflex_payout" header="Tổng tiền hệ thống">
        <template #body="{ data }">
          {{ $formatMoney(data, 'adflex_payout') }}
        </template>
      </Column>
      <Column field="status" header="Status" ref="status">
        <template #filter>
          <Dropdown
            :modelValue="getStatusObject(advertiserStatuses, filters.status)"
            @update:modelValue="filters.status = $event.code"
            :options="advertiserStatuses"
            optionLabel="name"
            placeholder="Status"
          />
        </template>
        <template #body="{ data }">
          <v-status :options="advertiserStatuses" :code="data.status" />
        </template>
      </Column>

      <Column header="Action" ref="status">
        <template #body="{ data }">
          <advertiser-pay :advertiser="data" @update="fetchData()"/>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { ref } from 'vue';
import { advertiserService } from '@/services/advertiser';
import { useFetchData } from '@/composable/useFetchData';
import { useNotify } from '@/composable/useNotify';
import { useStatus } from '@/composable/useStatus';
import DateRange from '@/components/DateRange.vue';
import { TDate } from '@/helper';
import VStatus from '@/components/VStatus';
import AdvertiserPay from './components/AdvertiserPay.vue';

export default {
  components: {
    DateRange,
    VStatus,
    AdvertiserPay,
  },
  setup() {
    const advertisers = ref([]);
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
        const { data, meta } = await advertiserService.getAll(query);
        advertisers.value = data;
        return meta.totalRows;
      } catch (e) {
        notify.error(e);
        return 0;
      } finally {
        loading.value = false;
      }
    }

    return {
      advertisers,
      loading,
      ...useFetchData(fetchData, params),
      ...useStatus(),
    };
  },
};
</script>
<style scoped lang="scss">
.table-header {
  display: flex;
  justify-content: space-between;
}
.product-image {
  width: 100px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.p-dialog .product-image {
  width: 150px;
  margin: 0 auto 2rem auto;
  display: block;
}
.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
  &.status-instock {
    background: #c8e6c9;
    color: #256029;
  }
  &.status-outofstock {
    background: #ffcdd2;
    color: #c63737;
  }
  &.status-lowstock {
    background: #feedaf;
    color: #8a5340;
  }
}
::v-deep(.p-toolbar) {
  flex-wrap: wrap;
  .p-button {
    margin-bottom: 0.25rem;
  }
}
</style>
