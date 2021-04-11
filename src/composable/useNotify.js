import { useToast } from 'primevue/usetoast';

export function useNotify() {
  const toast = useToast();

  const success = (mess) => {
    toast.add({
      severity: 'success',
      summary: 'Success Message',
      detail: mess,
      life: 3000,
    });
  };

  const info = (mess) => {
    toast.add({
      severity: 'info',
      summary: 'Info Message',
      detail: mess,
      life: 3000,
    });
  };

  const error = (mess) => {
    toast.add({
      severity: 'error',
      summary: 'Warn Message',
      detail: mess,
      life: 3000,
    });
  };

  return { success, info, error };
}
