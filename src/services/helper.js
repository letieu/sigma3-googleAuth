export class Response {
  constructor(data, meta) {
    this.data = data;
    this.meta = meta;
  }
  static fromPaginate(axiosResponse) {
    const { data, meta } = axiosResponse.data;
    return new Response(data, {
      totalRows: meta.page.total_elements,
    });
  }

  static fromOne(axiosResponse) {
    const { data, meta } = axiosResponse.data;
    return new Response(data, meta);
  }
}
