<template>
  <Toolbar>
    <template #left>
      <Button label="New" icon="pi pi-plus" class="p-mr-2" />
      <Button label="Upload" icon="pi pi-upload" class="p-button-success" />
      <i class="pi pi-bars p-toolbar-separator p-mr-2" />
      <SplitButton
        label="Save"
        icon="pi pi-check"
        :model="items"
        class="p-button-warning"
      ></SplitButton>
    </template>

    <template #right>
      <Button icon="pi pi-search" class="p-mr-2" />
      <Button icon="pi pi-calendar" class="p-button-success p-mr-2" />
      <Button icon="pi pi-times" class="p-button-danger" />
    </template>
  </Toolbar>

  <card>
    <template #content>
      <table class="detail">
        <thead>
          <tr>
            <th>Date</th>
            <th>Advertiser</th>
            <th>System revenue</th>
            <th>System payment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ consolidation.start_date }}</td>
            <td>{{ consolidation.advertiser_id }}</td>
            <td>{{ consolidation.adflex_payout }}</td>
            <td>{{ consolidation.adflex_payout }}</td>
          </tr>
        </tbody>
      </table>

      <Timeline
        :value="consolidationStatuses"
        layout="horizontal"
        align="top"
        class="p-mx-6"
      >
        <template #content="slotProps" class="tieu">
          <Button
            v-if="consolidation.status == slotProps.item.code"
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

  <conversion
    v-if="consolidation.id"
    :consolidation="consolidation"
    class="p-mt-5"
  />
</template>

<script>
import { consolidationService } from '@/services/consolidation';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStatus } from '@/composable/useStatus';
import Conversion from './components/Conversions.vue';

export default {
  components: {
    Conversion,
  },
  setup() {
    const consolidation = ref({});
    const route = useRoute();

    onBeforeMount(async () => {
      const { data } = await consolidationService.getOne(route.params.id);
      consolidation.value = data;
    });

    return {
      consolidation,
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
