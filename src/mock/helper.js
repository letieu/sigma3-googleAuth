export function paginatate(data) {
  return {
    data: data,
    meta: {
      status: 200,
      page: {
        page_number: 0,
        page_size: 0,
        total_elements: data.length,
        total_page: 0,
      },
    },
  };
}

export function response(data) {
  return {
    data: data,
    meta: {
      status: 200,
    },
  };
}
