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
//https://www.primefaces.org/data/customers
    const res = await axios.get('/message', {
      params,
    });
    return res.data;
  }
}
