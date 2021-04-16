import { paginatate, response } from './helper';

export const Advertisers = {
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
    advertiser_payment() {
      return 2243;
    },
    advertiser_payment_left() {
      return 224;
    },
    start_date() {
      return '2019-10-1';
    },
    end_date() {
      return '2019-10-8';
    },
    due_date() {
      return '2019-10-1';
    },
    adflex_pay() {
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
    adflex_deduct_revenue() {
      return 800;
    },
    adflex_deduct_revenue_vnd() {
      return 33;
    },
    status() {
      return 't';
    },
    consolidation_id() {
      return 'consId';
    },
    name() {
      return 'butabatri_23_3454';
    },
  },

  all(schema) {
    const advertisers = schema.advertisers.all().models;
    return paginatate(advertisers);
  },
  one(schema, request) {
    const advertiser = schema.advertisers.find(request.params.id);
    return response(advertiser);
  },
  store(schema, request) {
    const advertiser = schema.advertisers.find(1);
    const attrs = JSON.parse(request.requestBody);
    const newAdvertiser = { ...advertiser };
    newAdvertiser.consolidation_id = attrs.id;
    newAdvertiser.due_date = attrs.due_date;
    return response(newAdvertiser);
  },
  update(schema, request) {
    let { status, modified_by } = JSON.parse(request.requestBody);
    const advertiser = schema.advertisers.find(request.params.id);
    advertiser.status = status;
    advertiser.modified_by = modified_by;

    return response(advertiser);
  },
  pay(schema, request) {
    const advertiser = schema.advertisers.find(request.params.id);
    advertiser.status = 'bb';
    return response(advertiser);
  },
};
