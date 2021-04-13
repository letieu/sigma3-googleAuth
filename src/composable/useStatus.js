export function useStatus() {
  const consolidationStatuses = [
    { name: 'tieu', code: 't' },
    { name: 'active', code: '-1' },
    { name: 'test', code: 'aa' },
    { name: 'Bb', code: 'bb' },
  ];

  function getStatusObject(options, code) {
    return options.find((option) => option.code == code);
  }

  return {
    consolidationStatuses,
    getStatusObject,
  };
}
