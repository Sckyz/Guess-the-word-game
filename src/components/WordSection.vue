<template>
  <div v-if="box.all">
    <span class="row justify-center">Add The Word You're Thinking</span>
    <MyInput v-model="wordField" class="inp" />
    <MyImage src="../../public/imgs/GamerCat1.jpeg" class="q-ma-xl" />
    <MyButton @click="playGame(box)" label="Play Game" size="40px" />
    <MyImage src="../../public/imgs/GamerCat2.jpeg" class="q-ma-xl" />
  </div>
  <GameSection v-if="box.game" />
</template>

<script setup>
import MyImage from "./MyImage.vue";
import MyInput from "./MyInput.vue";
import MyButton from "./MyButton.vue";
import GameSection from "./GameSection.vue";
import { useWordStore } from "../stores/WordStore";
import { useLetterStore } from "../stores/LetterStore";
import { useQuasar } from "quasar";
import { ref, reactive } from "vue";
import { cleanField } from "../helpers/index";

const $q = useQuasar();
const wordField = ref("");
const store = useWordStore();
const letters = useLetterStore();
const allowedChars = /^[ça-z-]*$/;

const box = reactive({
  all: true,
  game: false,
});

function playGame(key) {
  if (wordField.value === "") {
    $q.notify({
      message: "There's no word in there :(",
      color: "accent",
      position: "center",
    });
    return;
  }
  if (!allowedChars.test(wordField.value.toLowerCase())) {
    $q.notify({
      message:
        "That character is not allowed in this game :(  Please enter a letter that belongs to our alphabet, with no spaces.",
      color: "accent",
      position: "center",
    });
    cleanField(wordField);
    return;
  }
  store.word = wordField.value.toLowerCase();
  letters.letter = store.word.split("");
  key.all = false;
  key.game = true;
}
</script>

<style scoped>
span {
  font-size: 60px;
  text-align: center;
}
.inp {
  text-transform: lowercase;
}
</style>
