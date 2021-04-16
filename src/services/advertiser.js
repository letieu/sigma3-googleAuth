import axios from 'axios';
import { Response } from './helper';

export const advertiserService = {
  async getAll(params) {
    const res = await axios.get('/invoices/advertisers', { params });
    return Response.fromPaginate(res);
  },
  async getOne(id) {
    const res = await axios.get(`/invoices/advertisers/${id}`);
    return Response.fromOne(res);
  },

  async create(payload) {
    const res = await axios.post('/advertisers', payload);
    return Response.fromOne(res);
  },

  async update(id, payload) {
    const res = await axios.put(`/invoices/advertisers/${id}`, payload);
    return Response.fromOne(res);
  },
  async pay(id, payload) {
    const res = await axios.put(
      `/invoices/advertisers/${id}/transactions`,
      payload
    );
    return Response.fromOne(res);
  },
};
