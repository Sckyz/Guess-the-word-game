<template>
  <div v-if="box.div">
    <span class="column items-center q-mt-lg">You have 6 chances, good luck :)</span>
    <div>
      <div class="row flex-center">
        <div class="dashes column items-center" v-for="letter in store.letter">
          <span class="letter-in-dashes">{{ letter }}</span>
        </div>
      </div>
      <div class="row flex-center">
        <MyInput v-model="letterField" :maxlength="1" class="input-text" />
        <MyButton label="TRY" @click="tryLetter(box)" size="30px" />
      </div>
      <span class="column items-center">Chances left: {{ chances }}</span>
      <span class="column items-center">Wrong letters: {{ fail }}</span>
    </div>
    <div class="row flex-center">
      <q-img
        class="rounded-borders q-ml-xl q-mr-lg"
        width="20vw"
        src="PlayingCats.jpeg"
      />
    </div>
  </div>
  <GameOver v-if="box.over" :win="result()" />
</template>

<script setup>
import MyInput from "./MyInput.vue";
import MyButton from "./MyButton.vue";
import GameOver from "./GameOver.vue";
import { useQuasar } from "quasar";
import { cleanField } from "../helpers/index";
import { useMyStores } from "../stores/MyStores";
import { ref, computed, reactive, watch } from "vue";

const fail = computed(() => {
  return store.fails;
});

const box = reactive({
  div: true,
  over: false,
});

const $q = useQuasar();
const chances = ref(6);
const resultGame = ref();
const letterField = ref("");
const store = useMyStores();
const allowedChars = /^[ça-z-]*$/;

function tryLetter() {
  if (letterField.value === "") {
    $q.notify({
      message: "There isn't a letter in there :(",
      color: "accent",
      position: "center",
    });
    return;
  }
  if (!allowedChars.test(letterField.value.toLowerCase())) {
    $q.notify({
      message:
        "That character is not allowed in this game :(  Please enter a letter that belongs to our alphabet.",
      color: "accent",
      position: "center",
    });
    cleanField(letterField);
    return;
  }
  if (checkIfInside(store.tries, letterField.value.toLowerCase())) {
    $q.notify({
      message: "This letter was already tested, please try another one",
      color: "accent",
      position: "center",
    });
    cleanField(letterField);
    return;
  }
  store.tries.push(letterField.value.toLowerCase());
  if (checkIfInside(store.word.split(""), letterField.value.toLowerCase())) {
    showLetters(letterField.value.toLowerCase());
    cleanField(letterField);
    return;
  }
  chances.value--;
  store.fails.push(letterField.value.toLowerCase());
  cleanField(letterField);
}

function checkIfInside(arr, letter) {
  return arr.includes(letter);
}

function showLetters(trier) {
  for (const elements of document.getElementsByClassName("letter-in-dashes")) {
    if (elements.textContent.includes(trier)) {
      elements.style.visibility = "visible";
      store.spans.push(elements.textContent);
    }
  }
}

function result() {
  if (store.fails.length > 5) {
    box.div = false;
    box.over = true;
    resultGame.value = false;
    return resultGame.value;
  }
  if (store.letter.length == store.spans.length) {
    box.div = false;
    box.over = true;
    resultGame.value = true;
    return resultGame.value;
  }
}

watch(() => result(), (old) => {
    store.setGameValue(old);
  }
);
</script>

<style scoped>
span {
  font-size: 60px;
}
.letter-in-dashes {
  visibility: hidden;
}
.dashes {
  border-bottom: 1px solid black;
  margin: 3px;
  display: inline;
}
.input-text {
  width: 60px;
}
</style>
