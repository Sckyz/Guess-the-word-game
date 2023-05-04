<template>
  <div class="row flex-center">
    <span class="title q-ml-xl">Guess The Word I'm Thinking Game</span>
    <GameRules />
    <MyImage src="../../public/imgs/IntroCats.jpeg" />
  </div>
</template>

<script setup>
import MyImage from "./MyImage.vue";
import GameRules from "./GameRules.vue";
</script>

<style scoped>
.title {
  font-size: 75px;
}
</style>
