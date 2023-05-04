<template>
  <div class="main bg-red-10 column flex-center" v-if="box.div">
    <span>Oh no! Good luck next time :(</span>
    <q-separator color="black" spaced />
    <WordAnswer />
    <MyImage src="../../public/imgs/LostCat.jpeg" class="q-mt-xl" />
    <MyButton label="Play Again" size="30px" @click="playAgain(box)" />
  </div>
  <HomePage v-if="box.home" />
</template>

<script setup>
import MyImage from "./MyImage.vue";
import MyButton from "./MyButton.vue";
import WordAnswer from "./WordAnswer.vue";
import HomePage from "../components/HomePage.vue";
import { useTrieStore } from "../stores/TrieStore";
import { useLetterStore } from "../stores/LetterStore";
import { useSpanArrayStore } from "../stores/SpanArrayStore";
import { useFailAttemptStore } from "../stores/FailAttemptStore";
import { reactive } from "vue";
import { playAgain } from "../helpers/index";

const tries = useTrieStore();
const fails = useFailAttemptStore();
const spans = useSpanArrayStore();
const letters = useLetterStore();

const box = reactive({
  div: true,
  home: false,
  tries: tries.reset(),
  fails: fails.reset(),
  spans: spans.reset(),
  letters: letters.reset(),
});
</script>

<style scoped>
.main {
  height: 1000px;
  width: 1830px;
}
span {
  font-size: 75px;
}
</style>
