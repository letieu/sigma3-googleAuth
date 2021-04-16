<template>
  <Calendar v-model="date" dateFormat="yy-mm-dd" />
</template>

<script>
import { computed } from 'vue';
import { TDate } from '@/helper';

export default {
  props: ['modelValue'],
  setup(props, { emit }) {
    const date = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', new TDate(value).format()),
    });

    return { date };
  },
};
</script>
