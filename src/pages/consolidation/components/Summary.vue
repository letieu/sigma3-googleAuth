<template>
  <Button label="Summary" icon="pi pi-calendar" @click="showSummary = true" />
  <Dialog
    header="Summary"
    v-model:visible="showSummary"
    :style="{ width: '60vw' }"
  >
    <DataTable
      :value="offers"
      :paginator="true"
      :rows="10"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 20, 50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      responsiveLayout="scroll"
    >
      <Column field="offer_id" header="Offer ID"></Column>
      <Column field="conversion_count" header="Success"></Column>
      <Column header="Cancel">
        <template #body="{ data }">
          <Badge
            :value="data.advertiser_cancelled_conversion_count"
            severity="danger"
            style="cursor: pointer"
            @click="$refs[`conversion_cancel_${data.offer_id}`].toggle($event)"
          ></Badge>
          <OverlayPanel
            :ref="`conversion_cancel_${data.offer_id}`"
            appendTo="body"
            :showCloseIcon="true"
            style="width: 650px"
            :breakpoints="{ '960px': '75vw' }"
          >
            <DataTable
              :value="data.advertiser_cancelled_conversions"
              :paginator="true"
              :rows="5"
              responsiveLayout="scroll"
            >
              <Column field="offer_id" header="Offer" sortable></Column>
              <Column field="customer_name" header="Name" sortable></Column>
              <Column field="customer_phone" header="Phone" sortable></Column>
              <Column field="quantity" header="Quantity" sortable></Column>
              <Column header="adflex_payout">
                <template #body="{ data }">
                  {{ $formatMoney(data, 'adflex_payout') }}
                </template>
              </Column>
              <Column field="reason" header="Reason" sortable></Column>
            </DataTable>
          </OverlayPanel>
        </template>
      </Column>
      <Column header="Price unit">
        <template #body="{ data }">
          {{ $formatMoney(data, 'offer_adflex_payout') }}
        </template>
      </Column>
      <Column header="Price unit">
        <template #body="{ data }">
          {{ $formatMoney(data, 'offer_adflex_payout') }}
        </template>
      </Column>
    </DataTable>
  </Dialog>
</template>

<script>
import { consolidationService } from '@/services/consolidation';
import { onMounted, ref } from 'vue';

export default {
  props: ['consolidation'],
  setup(props) {
    const showSummary = ref(false);
    const offers = ref([]);
    onMounted(async () => {
      const { data } = await consolidationService.getSummary(
        props.consolidation?.id
      );
      offers.value = data;
    });

    return {
      showSummary,
      offers,
    };
  },
};
</script>

<style></style>
