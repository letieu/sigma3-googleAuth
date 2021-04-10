import axios from 'axios';

export default class ProductService {
  getProductsSmall() {
    return axios
      .get('assets/layout/data/products-small.json')
      .then((res) => res.data.data);
  }

  getProducts(filter) {
    console.log(filter);
    return axios
      .get('assets/layout/data/products.json')
      .then((res) => res.data.data);
  }

  getProductsWithOrdersSmall() {
    return axios
      .get('assets/layout/data/products-orders-small.json')
      .then((res) => res.data.data);
  }
}
