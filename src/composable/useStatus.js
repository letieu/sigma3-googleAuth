export function useStatus() {
  const consolidationStatuses = [
    { name: 'INIT', code: 'INIT', color: 'success' },
    { name: 'CONFIRMED', code: 'CONFIRMED', color: 'primary' },
    { name: 'INVOICE_CREATED', code: 'INVOICE_CREATED', color: 'warning' },
    { name: 'REJECTED', code: 'REJECTED', color: 'danger' },
  ];

  const advertiserStatuses = [
    { name: 'tieu1', code: 't', color: 'success' },
    { name: 'active2', code: '-1', color: 'primary' },
    { name: 'test', code: 'aa', color: 'danger' },
    { name: 'Waitj ja', code: 'bb', color: 'warning' },
  ];

  const conversionStatuses = [
    { name: 'co-0', code: -1, color: 'success' },
    { name: 'co-1', code: 1, color: 'primary' },
    { name: 'co-2', code: 2, color: 'danger' },
    { name: 'co-3', code: 3, color: 'warning' },
  ];

  function getStatusObject(options, code) {
    return options.find((option) => option.code == code);
  }

  return {
    conversionStatuses,
    consolidationStatuses,
    advertiserStatuses,
    getStatusObject,
  };
}
