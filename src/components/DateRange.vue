<template>
  <Calendar
    v-model="dates"
    :monthNavigator="true"
    :yearNavigator="true"
    yearRange="2000:2030"
    selectionMode="range"
    :manualInput="!!manualInput"
    :maxDate="maxDate"
    :minDate="minDate"
  />
</template>

<script>
import { ref, watchEffect } from 'vue';
import { TDate } from '@/helper';

function initDates(start = null, end = null) {
  if (start && end) {
    return ref([TDate.fromFormated(start), TDate.fromFormated(end)]);
  } else {
    return ref([]);
  }
}

export default {
  props: ['start', 'end', 'manualInput', 'maxDate', 'minDate'],
  setup(props, { emit }) {
    const dates = initDates(props.start, props.end);

    watchEffect(() => {
      if (dates.value[1]) {
        emit('update:start', new TDate(dates.value[0]).format());
        emit('update:end', new TDate(dates.value[1]).format());
      }
    });
    return { dates };
  },
};
</script>
