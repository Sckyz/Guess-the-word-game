<template>
  <span>The word I was thinking is: </span>
  <q-separator color="black" spaced />
  <span class="correct">{{ store.word }}</span>
</template>

<script setup>
import { useMyStores } from "../stores/MyStores";

const store = useMyStores();
</script>

<style scoped>
span {
  font-size: 75px;
}
.correct {
  border-bottom: solid;
}
</style>
