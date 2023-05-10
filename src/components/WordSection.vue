<template>
  <div v-if="box.all">
    <span class="row justify-center">Add The Word You're Thinking</span>
    <MyInput v-model="wordField" class="input-text" />
    <q-img
      class="rounded-borders q-ml-xl q-mr-lg"
      width="20vw"
      src="GamerCat1.jpeg"
    />
    <MyButton @click="playGame(box)" label="Play Game" size="40px" />
    <q-img
      class="rounded-borders q-ml-xl q-mr-lg"
      width="20vw"
      src="GamerCat2.jpeg"
    />
  </div>
  <GameSection v-if="box.game" />
</template>

<script setup>
import MyInput from "./MyInput.vue";
import MyButton from "./MyButton.vue";
import GameSection from "./GameSection.vue";
import { useMyStores } from "../stores/MyStores";
import { useQuasar } from "quasar";
import { ref, reactive } from "vue";
import { cleanField } from "../helpers/index";

const $q = useQuasar();
const wordField = ref("");
const store = useMyStores();
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
  store.setValue(wordField.value.toLowerCase());
  store.letter = store.word.split("");
  key.all = false;
  key.game = true;
}
</script>

<style scoped>
span {
  font-size: 60px;
}
</style>
