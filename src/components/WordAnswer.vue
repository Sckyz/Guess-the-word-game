<template>
  <span>The word I was thinking is: </span>
  <q-separator color="black" spaced />
  <span class="correct">{{ store.word }}</span>
</template>

<script setup>
import { useWordStore } from "../stores/WordStore";

const store = useWordStore();
</script>

<style scoped>
span {
  font-size: 75px;
}
.correct {
  border-bottom: solid;
}
</style>
