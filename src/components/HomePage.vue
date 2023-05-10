<template>
  <div class="row flex-center">
    <BeforeGameStarts v-if="box.before" />
    <WordSection v-if="box.word" />
    <MyButton
      @click="startGame(box)"
      v-if="box.button"
      label="Start Game"
      size="70px"
    />
  </div>
</template>

<script setup>
import MyButton from "./MyButton.vue";
import WordSection from "./WordSection.vue";
import BeforeGameStarts from "./BeforeGameStarts.vue";
import { reactive } from "vue";

const box = reactive({
  word: false,
  before: true,
  button: true,
});

function startGame(key) {
  key.word = true;
  key.before = false;
  key.button = false;
}
</script>
