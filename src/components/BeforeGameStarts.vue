<template>
  <div class="row flex-center">
    <span class="title q-ml-xl">Guess The Word I'm Thinking Game</span>
    <GameRules />
    <q-img
      class="rounded-borders q-ml-xl q-mr-lg"
      width="20vw"
      src="IntroCats.jpeg"
    />
  </div>
</template>

<script setup>
import GameRules from "./GameRules.vue";
</script>

<style scoped>
.title {
  font-size: 75px;
}
</style>
