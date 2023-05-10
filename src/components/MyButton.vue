<template>
  <q-btn
    class="bg-info text-white q-ma-lg"
    :size="size"
    :label="label"
    push
    rounded
  />
</template>

<script setup>
defineProps({
  label: String,
  size: String,
});
</script>
