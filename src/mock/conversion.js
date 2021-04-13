import { paginatate } from './helper';

export const Conversions = {
  factory: {
    modified_at() {
      return new Date().toISOString();
    },
    adflex_payout() {
      return 1000;
    },
    adflex_payout_vnd() {
      return 2000;
    },
    status() {
      return -1;
    },
    offer_id() {
      return 2323;
    },
    customer_phone() {
      return '2423131213';
    },
    customer_name() {
      return 'le canh tieu';
    },
    quantity() {
      return 2;
    },
    record_date() {
      return new Date().toISOString();
    },
    success_date() {
      return new Date().toISOString();
    },
    offer_type() {
      return 'cpo';
    },
    reason() {
      return 'reason adf';
    },
    payment_status() {
      return '-1';
    },
  },

  all(schema) {
    const conversions = schema.conversions.all().models;
    return paginatate(conversions);
  },
};
