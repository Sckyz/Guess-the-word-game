<template>
  <div v-if="beforeStartsGame" class="before">
    <span class="title">Guess The Word I'm Thinking Game</span>
    <q-btn-dropdown class="rules" label="How To Play">
      <q-list class="items">
        <q-item>
          <q-item-section>
            <q-item-label> I. Click the "Start Game" button </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator horizontal black />

        <q-item>
          <q-item-section>
            <q-item-label
              >II. You will see written in a box: "type a word"</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-separator horizontal black />

        <q-item>
          <q-item-section>
            <q-item-label
              >III. Add a word of your choosing into the box</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-separator horizontal black />

        <q-item>
          <q-item-section>
            <q-item-label
              >IV. Click the button "play" to start playing</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-separator horizontal black />

        <q-item>
          <q-item-section>
            <q-item-label
              >V. Next, have a friend try to guess the word by adding letters
              into the dashes</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-img src="/imgs/catsssss.jpeg" class="cats" />
    <q-btn
      @click="startGame"
      class="start"
      push
      square
      label="Start Game"
    ></q-btn>
  </div>
  <div v-if="showWordsection" class="column items-center">
    <span>Add the word you're thinking</span>
    <q-input
      class="word"
      rounded
      standout
      type="text"
      v-model="wordField"
      autocomplete="off"
    />
    <q-btn
      @click="addToArray"
      class="addWord"
      :ripple="{ color: 'purple' }"
      push
      square
      label="Play Game"
    />
    <q-img src="/imgs/cat.jpeg" class="gamerCat" />
  </div>
  <div v-if="showGame">
    <span>You have 6 chances, good luck :)</span>
    <div class="dashes column items-center" v-for="letter in word">
      <span class="letterInDashes">{{ letter }}</span>
    </div>
    <div class="row flex-center">
      <q-input
        class="letter"
        rounded
        standout
        type="text"
        v-model="letterField"
        autocomplete="off"
        maxlength="1"
        minlength="1"
      />
      <q-btn
        round
        color="purple"
        glossy
        label="TRY"
        @click="playGame"
        class="try"
      />
    </div>
    <span class="column items-center" v-if="chancesAmount"
      >Chances left: {{ chances }}</span
    >
    <span class="column items-center">Wrong letters: {{ fails }}</span>
  </div>
  <div v-if="endGameWin" class="column items-center">
    <span>Congrats, you have guessed correctly!</span>
    <span>The word I was thinking is: {{ rigthWord }}</span>
    <div v-if="playAgain">
      <q-btn
        class="again"
        @click="PlayAgain"
        :ripple="{ color: 'purple' }"
        push
        square
        label="Play Again"
      />
    </div>
    <q-img src="/imgs/happyCats.jpeg" class="happy" />
  </div>
  <div v-if="endGameLost" class="column items-center">
    <span>Oh no! Better luck next time.</span>
    <span>The word I was thinking is:{{ rigthWord }}</span>
    <div v-if="playAgain">
      <q-btn
        @click="PlayAgain"
        class="again"
        :ripple="{ color: 'purple' }"
        push
        square
        label="Play Again"
      />
    </div>
    <q-img src="/imgs/catSad.jpeg" class="sad" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";

const fails = computed(() => {
  return failedTries;
});
const rigthWord = computed(() => {
  return word.value;
});

const $q = useQuasar();
const reg = /^[ça-z]*$/;
const showWordsection = ref(false);
const endGameWin = ref(false);
const endGameLost = ref(false);
const showGame = ref(false);
const playAgain = ref(false);
const beforeStartsGame = ref(true);
const chancesAmount = ref(true);
const chances = ref(6);
const wordField = ref("");
const letterField = ref("");
const word = ref("");
const letters = ref([]);
const failedTries = [];
const arr2 = [];
const tries = [];

function startGame() {
  beforeStartsGame.value = !beforeStartsGame.value;
  showWordsection.value = !showWordsection.value;
}

function addToArray() {
  if (wordField.value === "") {
    $q.notify({
      message: "There's no word in there :(",
      color: "accent",
      position: "center",
    });
    return true;
  }
  if (!reg.test(wordField.value)) {
    $q.notify({
      message:
        "That character is not allowed in this game :(  Please enter a lower cased letter that belongs in our alphabet, with no spaces.",
      color: "accent",
      position: "center",
    });
    cleanField();
    return true;
  }
  word.value = wordField.value;
  letters.value = word.value.split("");
  showWordsection.value = !showWordsection.value;
  showGame.value = !showGame.value;
}

function playGame() {
  if (letterField.value === "") {
    $q.notify({
      message: "There's no word in there :(",
      color: "accent",
      position: "center",
    });
    return true;
  }
  if (!reg.test(letterField.value)) {
    $q.notify({
      message:
        "That character is not allowed in this game :(  Please enter a lower cased letter that belongs in our alphabet, with no spaces.",
      color: "accent",
      position: "center",
    });
    cleanField();
    return true;
  }
  if (inTries(letterField.value)) {
    $q.notify({
      message: "This letter was already tested, please try another one",
      color: "accent",
      position: "center",
    });
    cleanField();
    return true;
  }
  tries.push(letterField.value);
  if (inWords(letterField.value)) {
    showLetters(letterField.value);
    cleanField();
    isAlive();
    return true;
  }
  chances.value--;
  failedTries.push(letterField.value);
  cleanField();
  isAlive();
}

function isAlive() {
  if (failedTries.length > 5) {
    lost();
  }
  areEqual(letters.value, arr2);
}

function areEqual(array1, array2) {
  if (array1.length === array2.length) {
    won();
  }
}

function won() {
  endGameWin.value = !endGameWin.value;
  playAgain.value = !playAgain.value;
  showGame.value = !showGame.value;
  changeBackgroundColor("#13D513");
}

function lost() {
  endGameLost.value = !endGameWin.value;
  playAgain.value = !playAgain.value;
  showGame.value = !showGame.value;
  changeBackgroundColor("#B60606");
}

function PlayAgain() {
  window.location.reload();
}

function cleanField() {
  wordField.value = "";
  letterField.value = "";
}

function showLetters(trier) {
  for (const elements of document.getElementsByClassName("letterInDashes")) {
    if (elements.textContent.includes(trier)) {
      elements.style.visibility = "visible";
      arr2.push(elements.textContent);
    }
  }
}

function checkIfInside(arr, letter) {
  const some = arr.includes(letter);
  return some;
}

function inTries(char) {
  return checkIfInside(tries, char);
}

function inWords(char) {
  return checkIfInside(word.value.split(""), char);
}

function changeBackgroundColor(color) {
  document.body.style.background = color;
}
</script>

<style scoped>
span {
  font-size: 80px;
}
.title {
  font-size: 100px;
}
.letterInDashes {
  visibility: hidden;
}
.dashes {
  border-bottom: 1px solid black;
  margin: 3px;
  display: inline;
}
.rules {
  background-color: #6618be;
  color: white;
  font-size: medium;
  height: 60px;
  float: left;
  margin-left: 120px;
}
.items {
  background-color: #bb84c6;
  padding: 10px;
}
.items :hover {
  background-color: #c6a1e9;
}
.cats {
  width: 30vw;
  margin-left: 50px;
}
.gamerCat {
  width: 30vw;
  text-align: center;
}
.happy {
  width: 30vw;
  text-align: center;
}
.sad {
  width: 30vw;
  text-align: center;
}
.before {
  text-align: center;
}
.start {
  background-color: #6618be;
  color: white;
  font-size: medium;
  height: 60px;
  float: right;
  margin-right: 320px;
}
.addWord {
  background-color: #482d61;
  color: bisque;
}
.word {
  font-size: 20px;
}
.letter {
  font-size: 30px;
  width: 60px;
}
.again {
  background-color: #6618be;
  color: white;
  font-size: medium;
  height: 60px;
}
.try {
  background-color: #6618be;
  color: white;
  font-size: medium;
  height: 40px;
}
</style>
