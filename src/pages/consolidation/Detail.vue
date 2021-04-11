<template>
  <v-card title="detail">
    <div class="flex">
      <table class="tb">
        <tr>
          <th v-check="'G8_PASS_CONSOLIDATION_DETAIL_DATE'">Kỳ đối soát</th>
          <th v-check="'G8_PASS_CONSOLIDATION_DETAIL_ADVERTISER'">
            Advertiser
          </th>
          <th v-check="'G8_PASS_CONSOLIDATION_DETAIL_PAYOUT'">Adflex payout</th>
          <th v-check="'G8_PASS_CONSOLIDATION_DETAIL_REVENUE'">
            Adflex revenue
          </th>
          <th v-check="'G8_PASS_CONSOLIDATION_DETAIL_STATUS'">Status</th>
          <th />
        </tr>

        <tr>
          <td v-check="'G8_PASS_CONSOLIDATION_DETAIL_DATE'">
            {{ consolidation.start_date }} - {{ consolidation.end_date }}
          </td>
          <td v-check="'G8_PASS_CONSOLIDATION_DETAIL_ADVERTISER'">
            {{ consolidation.advertiser_id }}
          </td>
          <td v-check="'G8_PASS_CONSOLIDATION_DETAIL_PAYOUT'">
          </td>
          <td v-check="'G8_PASS_CONSOLIDATION_DETAIL_REVENUE'">
          </td>
          <td v-check="'G8_PASS_CONSOLIDATION_DETAIL_STATUS'">
          </td>
          <td>
            <button
              v-show="consolidation.status == 0"
              class="btn-blue"
              @click="confirm"
              v-check="'G8_PASS_CONSOLIDATION_DETAIL_BUTTON_CONFIRM'"
            >
              Confirm
            </button>
            <button
              v-show="consolidation.status == 1"
              class="btn-blue"
              v-check="'G8_PASS_CONSOLIDATION_DETAIL_BUTTON_CREATE'"
            >
              <nuxt-link
                class="text-white"
                :to="{
                  name: 'advertisers-create',
                  params: { consolidationId: $route.params.id },
                }"
              >
                Create invoices
              </nuxt-link>
            </button>
            <button
              v-show="consolidation.status == 2"
              class="btn-blue"
              v-check="'G8_PASS_CONSOLIDATION_DETAIL_BUTTON_VIEW_INVOICE'"
            >
              <nuxt-link
                class="text-white"
                :to="`/advertisers/${consolidation.advertiser_invoice_id}`"
              >
                View invoices
              </nuxt-link>
            </button>

            <button class="btn-blue dropdown">
              Action
              <ul class="dropdown__menu">
                <li
                  @click="showSummary = true"
                  v-check="'G8_PASS_CONSOLIDATION_DETAIL_ACTION_SUMMARY'"
                >
                  Summary
                </li>
                <li>Export consolidation</li>
                <li>Export consolidation</li>
              </ul>
            </button>
          </td>
        </tr>
      </table>
    </div>
  </v-card>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const consolidation = ref({})

    return {
      consolidation,
    };
  }
};
</script>

<style></style>
