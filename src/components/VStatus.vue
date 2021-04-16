<template>
  <Tag class="p-px-3" :severity="status?.color" :value="status?.name"></Tag>
</template>

<script>
import { computed } from 'vue';

export default {
  props: ['options', 'code'],
  setup(props) {
    const status = computed(() =>
      props.options?.find((option) => option.code == props.code)
    );

    return {
      status,
    };
  },
};
</script>

<style></style>
