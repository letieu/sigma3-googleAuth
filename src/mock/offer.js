export const Offers = {
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
    adflex_deduct_revenue() {
      return 23;
    },
    adflex_deduct_revenue_vnd() {
      return 23;
    },
    offer_id() {
      return 343;
    },
    offer_adflex_payout() {
      return 2333;
    },
    offer_adflex_payout_vnd() {
      return 2333;
    },
    advertiser_cancelled_conversion_count() {
      return 2;
    },
    advertiser_cancelled_conversions() {
      return [
        {
          id: 'conversion1',
          adflex_payout: 100,
          adflex_payout_vnd: 2200000,
          offer_id: 'antrikhang-vn',
          customer_phone: '0915151515',
          customer_name: 'toandz',
          quantity: 1,
          record_date: '2020-10-10T12:12:12Z',
          success_date: '2020-10-10T12:12:12Z',
          offer_type: 'cpo',
          modified_at: '2020-10-10T12:12:12Z',
          payment_status: -1,
          reason: 'string',
        },
        {
          id: 'conversion2',
          adflex_payout: 100,
          adflex_payout_vnd: 2200000,
          offer_id: 'antrikhang-vn',
          customer_phone: '0915151515',
          customer_name: 'toandz',
          quantity: 1,
          record_date: '2020-10-10T12:12:12Z',
          success_date: '2020-10-10T12:12:12Z',
          offer_type: 'cpo',
          modified_at: '2020-10-10T12:12:12Z',
          payment_status: -1,
          reason: 'string',
        },
      ];
    },
    conversion_count() {
      return 5;
    },
  },
};
