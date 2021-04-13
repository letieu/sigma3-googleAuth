import axios from 'axios';

export default class CustomerService {
  async getCustomersSmall() {
    const res = await axios.get('assets/layout/data/customers-small.json');
    return res.data.data;
  }

  async getCustomersMedium() {
    const res = await axios.get('assets/layout/data/customers-medium.json');
    return res.data.data;
  }

  async getCustomersLarge() {
    const res = await axios.get('assets/layout/data/customers-large.json');
    return res.data.data;
  }

  async getCustomersXLarge() {
    const res = await axios.get('assets/layout/data/customers-xlarge.json');
    return res.data.data;
  }

  async getCustomers(params) {
    const res = await axios.get('/consolidations', {
      params,
    });
    return res.data;
  }
}
