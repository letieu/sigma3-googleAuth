import axios from 'axios';
import { Response } from './helper';

export const consolidationService = {
  async getAll(params) {
    const res = await axios.get('/consolidations', { params });
    return Response.fromPaginate(res);
  },
  async getOne(id) {
    const res = await axios.get(`/consolidations/${id}`);
    return Response.fromOne(res);
  },
  async getConversions(id, params) {
    const res = await axios.get(`/consolidations/${id}/conversions`, {
      params,
    });
    return Response.fromPaginate(res);
  },
  async getConversionsPreview(params) {
    const res = await axios.get('/consolidations/previews', {
      params,
    });
    return Response.fromPaginate(res);
  },

  async create(payload) {
    const res = await axios.post('/consolidations', payload);
    return Response.fromOne(res);
  },

  async update(id, payload) {
    const res = await axios.put(`/consolidations/${id}`, payload);
    return Response.fromOne(res);
  },
};
