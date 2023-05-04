<template>
  <div v-if="box.all">
    <span class="column items-center q-mt-lg"
      >You have 6 chances, good luck :)</span
    >
    <div>
      <div class="row flex-center">
        <div class="dashes column items-center" v-for="letter in store.word">
          <span class="letter-in-dashes">{{ letter }}</span>
        </div>
      </div>
      <div class="row flex-center">
        <MyInput v-model="letterField" :maxlength="1" class="inp" />
        <MyButton label="TRY" @click="tryLetter()" size="30px" />
      </div>
      <span class="column items-center">Chances left: {{ chances }}</span>
      <span class="column items-center">Wrong letters: {{ fails }}</span>
    </div>
    <div class="img">
      <MyImage src="../../public/imgs/PlayingCats.jpeg" class="q-ma-xl" />
    </div>
  </div>
  <GameOverLost v-if="box.lost" />
  <GameOverWin v-if="box.win" />
</template>

<script setup>
import MyImage from "./MyImage.vue";
import MyInput from "./MyInput.vue";
import MyButton from "./MyButton.vue";
import GameOverWin from "./GameOverWin.vue";
import GameOverLost from "./GameOverLost.vue";
import { useTrieStore } from "../stores/TrieStore";
import { useWordStore } from "../stores/WordStore";
import { useLetterStore } from "../stores/LetterStore";
import { useSpanArrayStore } from "../stores/SpanArrayStore";
import { useFailAttemptStore } from "../stores/FailAttemptStore";
import { useQuasar } from "quasar";
import { ref, computed, reactive } from "vue";
import { cleanField } from "../helpers/index";

const fails = computed(() => {
  return failedTries.fails;
});

const $q = useQuasar();
const chances = ref(6);
const letterField = ref("");
const store = useWordStore();
const letters = useLetterStore();
const span = useSpanArrayStore();
const triesStore = useTrieStore();
const failedTries = useFailAttemptStore();
const allowedChars = /^[ça-z-]*$/;

const box = reactive({
  all: true,
  win: false,
  lost: false,
});

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
  if (checkIfInside(triesStore.tries, letterField.value.toLowerCase())) {
    $q.notify({
      message: "This letter was already tested, please try another one",
      color: "accent",
      position: "center",
    });
    cleanField(letterField);
    return;
  }
  triesStore.tries.push(letterField.value.toLowerCase());
  if (checkIfInside(store.word.split(""), letterField.value.toLowerCase())) {
    showLetters(letterField.value.toLowerCase());
    cleanField(letterField);
    checkLives();
    return;
  }
  chances.value--;
  failedTries.fails.push(letterField.value.toLowerCase());
  cleanField(letterField);
  checkLives();
}

function checkIfInside(arr, letter) {
  return arr.includes(letter);
}

function showLetters(trier) {
  for (const elements of document.getElementsByClassName("letter-in-dashes")) {
    if (elements.textContent.includes(trier)) {
      elements.style.visibility = "visible";
      span.spans.push(elements.textContent);
    }
  }
}

function checkLives() {
  if (failedTries.fails.length > 5) {
    box.all = false;
    box.lost = true;
  }
  checkArrays(letters.letter, span.spans);
}

function checkArrays(array1, array2) {
  if (array1.length === array2.length) {
    box.all = false;
    box.win = true;
  }
}
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
.inp {
  width: 60px;
  text-transform: lowercase;
}
.img {
  text-align: center;
}
</style>
