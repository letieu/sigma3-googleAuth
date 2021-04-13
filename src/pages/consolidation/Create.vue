<template>
  <Card>
    <template #title> Create consolidation </template>
    <template #content>
      <div class="p-formgroup-inline">
        <div class="p-field">
          <div class="p-float-label">
            <label for="advertiser_id" class="p-sr-only">Advertiser</label>
            <InputText
              required
              id="advertiser_id"
              type="text"
              placeholder="butabatri"
              v-model="filters.advertiser_id"
              :class="{ 'p-invalid': validator.advertiser_id.$invalid }"
              @click="clearConversions()"
            />
          </div>
          <small v-if="validator.advertiser_id.$invalid" class="p-error"
            >Advertiser ID is required</small
          >
        </div>
        <div class="p-field">
          <div class="p-float-label">
            <DateRange
              v-model:start="filters.start_date"
              v-model:end="filters.end_date"
              :class="{ 'p-invalid': validator.start_date.$invalid }"
              :maxDate="new Date()"
            />
          </div>
          <small
            v-if="validator.start_date.$invalid && validator.end_date.$invalid"
            class="p-error"
            >Date is required</small
          >
        </div>
        <Button
          type="button"
          label="Preview conversions"
          :disabled="validator.$invalid"
          @click="fetchData()"
        />

        <Button
          label="Create"
          :disabled="validator.$invalid"
          icon="pi pi-plus"
          class="p-button-success p-ml-3"
          @click="submit"
        />
      </div>

      <DataTable
        :value="conversions"
        :lazy="true"
        :loading="loading"
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
        </Column>

        <Column field="created_by" header="Created by" ref="created_by">
        </Column>

        <Column field="start_date" header="Start - End" ref="start_date">
        </Column>

        <Column field="status" header="Total payout" ref="status"> </Column>

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
import { useAuthStore } from '@/stores/auth';
import DateRange from '@/components/DateRange.vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useRouter } from 'vue-router';

function usePreviewConversion(params) {
  const conversions = ref([]);
  const loading = ref(false);
  const notify = useNotify();

  async function fetchConversions(query) {
    loading.value = true;
    try {
      const { data, meta } = await consolidationService.getConversionsPreview(
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

  function clearConversions() {
    conversions.value = [];
  }

  return {
    conversions,
    loading,
    clearConversions,
    ...useFetchData(fetchConversions, params, {
      preloadData: false,
      watchFilter: false,
    }),
  };
}

export default {
  components: {
    DateRange,
  },
  setup() {
    const notify = useNotify();
    const authStore = useAuthStore();
    const router = useRouter();
    const previewConversion = usePreviewConversion(params);
    const creating = ref(false);
    const rules = {
      advertiser_id: { required },
      start_date: { required },
      end_date: { required },
    };
    const params = {
      start_date: '',
      end_date: '',
      advertiser_id: '',
      created_by: authStore.email,
    };

    const validator = useVuelidate(rules, previewConversion.filters);

    async function submit() {
      try {
        const { data } = await consolidationService.create(
          previewConversion.filters
        );
        router.push({ name: 'consolidation-detail', params: { id: data.id } });
      } catch (e) {
        notify.error(e);
      } finally {
        creating.value = false;
      }
    }

    return { ...previewConversion, validator, submit };
  },
};
</script>
