import { paginatate, response } from './helper';

export const Consolidations = {
  factory: {
    modified_at() {
      return new Date().toISOString();
    },
    modified_by() {
      return 'tieulc@mock.vn';
    },
    created_at() {
      return new Date().toISOString();
    },
    created_by() {
      return 'tieulc@mock.vn';
    },
    advertiser_id() {
      return 'butabatri';
    },
    advertiser_invoice_id() {
      return 'ab_id';
    },
    start_date() {
      return '2019-10-1';
    },
    end_date() {
      return '2019-10-8';
    },
    adflex_payout() {
      return 1000;
    },
    adflex_payout_vnd() {
      return 2000;
    },
    adflex_invoice_revenue() {
      return 700;
    },
    adflex_invoice_revenue_vnd() {
      return 800;
    },
    status() {
      return -1;
    },
  },

  all(schema) {
    const consolidations = schema.consolidations.all().models;
    return paginatate(consolidations);
  },
  one(schema, request) {
    const consolidation = schema.consolidations.find(request.params.id);
    return response(consolidation);
  },
  store(schema) {
    const consolidation = schema.consolidations.find(1);
    return response(consolidation);
  },
  update(schema, request) {
    let { status, modified_by } = JSON.parse(request.requestBody);
    const consolidation = schema.consolidations.find(request.params.id);
    consolidation.status = status;
    consolidation.modified_by = modified_by;

    return response(consolidation);
  },
  summary(schema) {
    const offers = schema.offers.all().models;
    return response(offers);
  },
};
