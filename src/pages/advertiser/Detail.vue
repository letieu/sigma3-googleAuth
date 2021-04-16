<template>
  <Toolbar>
    <template #left>
      <advertiser-pay :advertiser="advertiser" @update="advertiser = $event" />
    </template>
  </Toolbar>

  <card>
    <template #content>
      <table class="detail">
        <thead>
          <tr>
            <th>Date</th>
            <th>Advertiser</th>
            <th>Invoice ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ advertiser.start_date }}</td>
            <td>{{ advertiser.advertiser_id }}</td>
            <td>{{ advertiser.name }}</td>
          </tr>
        </tbody>
      </table>

      <Timeline
        :value="advertiserStatuses"
        layout="horizontal"
        align="top"
        class="p-mx-6"
      >
        <template #content="slotProps" class="tieu">
          <Button
            v-if="advertiser.status == slotProps.item.code"
            :label="slotProps.item.name"
            icon="pi pi-check"
          />
          <Button
            disabled
            v-else
            class="p-button-outlined p-button-info"
            :label="slotProps.item.name"
          />
        </template>
      </Timeline>
    </template>
  </card>

  <card class="p-mt-3">
    <template #content>
      <Fieldset legend="Detail" :toggleable="true" class="p-mb-3">
        <div class="p-grid">
          <div class="p-col">asdf1</div>
          <div class="p-col">2</div>
        </div>
      </Fieldset>
      <DataTable
        :value="advertiser.offer_invoices"
        :paginator="true"
        :rows="10"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[10, 20, 50]"
        responsiveLayout="scroll"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      >
        <Column field="name" header="Name"></Column>
        <Column field="country.name" header="Country"></Column>
        <Column field="company" header="Company"></Column>
        <Column field="representative.name" header="Representative"></Column>
      </DataTable>
    </template>
  </card>
</template>

<script>
import { advertiserService } from '@/services/advertiser';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStatus } from '@/composable/useStatus';
import AdvertiserPay from './components/AdvertiserPay.vue';

export default {
  components: {
    AdvertiserPay,
  },
  setup() {
    const advertiser = ref({});
    const route = useRoute();

    onBeforeMount(async () => {
      const { data } = await advertiserService.getOne(route.params.id);
      advertiser.value = data;
    });

    return {
      advertiser,
      ...useStatus(),
    };
  },
};
</script>

<style scoped lang="scss">
.detail {
  width: 100%;
  tbody {
    padding-top: 50px;
  }
  td {
    text-align: center;
    font-size: 17px;
  }
}
</style>
