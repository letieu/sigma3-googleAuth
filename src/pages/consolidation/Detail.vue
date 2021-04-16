<template>
  <advertiser-create ref="advertiserCreateForm" />
  <Toolbar>
    <template #left>
      <Summary
        v-if="consolidation.id"
        :consolidation="consolidation"
        class="p-mr-2"
      />
      <Button
        :label="getActionLabel(consolidation.status)"
        icon="pi pi-check"
        class="p-button-success p-ml-2"
        :disabled="updating"
        @click="update(consolidation)"
      />
      <i class="pi pi-bars p-toolbar-separator p-mr-2" />

      <ProgressSpinner v-if="updating" style="width: 30px; height: 30px" />
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
import { useAuthStore } from '@/stores/auth';
import { useNotify } from '@/composable/useNotify';

import Conversion from './components/Conversions.vue';
import Summary from './components/Summary.vue';
import AdvertiserCreate from '@/pages/advertiser/components/AdvertiserCreate.vue';

function useUpdateConsolidation(consolidation) {
  const authStore = useAuthStore();
  const notify = useNotify();
  const updating = ref(false);
  const advertiserCreateForm = ref();
  const { consolidationStatuses } = useStatus();

  async function confirm() {
    const status = getNextStatus(consolidation.value.status);
    if (!status) return;
    updating.value = true;
    try {
      const { data } = await consolidationService.update(
        consolidation.value.id,
        {
          status: status,
          modified_by: authStore.email,
        }
      );
      consolidation.value = data;
    } catch (e) {
      notify.error(e);
    } finally {
      updating.value = false;
    }
  }

  async function update({ status, id }) {
    switch (getStatusIndex(status)) {
      case 2:
        advertiserCreateForm.value.showDialog(id);
        break;
      case 3:
        console.log('asdf');
        break;
      default:
        confirm();
    }
  }

  function getNextStatus(currentStatus) {
    return consolidationStatuses[getStatusIndex(currentStatus) + 1]?.code;
  }

  function getStatusIndex(currentStatus) {
    return consolidationStatuses.findIndex(
      (status) => status.code == currentStatus
    );
  }

  function getActionLabel(currentStatus) {
    switch (getStatusIndex(currentStatus)) {
      case 0:
        return 'do-0';
      case 1:
        return 'do-1';
      case 2:
        return 'Create advertiser invoice';
      case 3:
        return 'Go to';
    }
  }

  return { update, updating, getNextStatus, getActionLabel, advertiserCreateForm };
}

export default {
  components: {
    Conversion,
    Summary,
    AdvertiserCreate,
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
      ...useUpdateConsolidation(consolidation),
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
