<template>
  <div v-if="beforeStartsGame" class="row flex-center">
    <h3>
      <q-btn-dropdown color="info" size="25px" label="How To Play">
        <q-list class="bg-accent">
          <q-item>
            <q-item-section>
              <q-item-label> I. Click the "Start Game" button </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label
                >II. You will see written in a box: "type a word"</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label
                >III. Add a word of your choosing into the box</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label
                >IV. Press "enter", or click the button "play", to start
                playing</q-item-label
              >
            </q-item-section>
          </q-item>

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
      <br />
      <br />
      <img src="./imgs/catsssss.jpeg" alt="gamerCat" id="logo" />
    </h3>
    <q-btn
      @click="startGame"
      class="row flex-center"
      :ripple="{ color: 'purple' }"
      push
      color="info"
      text-color="white"
      square
      label="Start Game"
      size="20px"
    ></q-btn>
  </div>
  <div v-if="showWordsection" class="flex flex-center">
    <h2>Add the word you're thinking</h2>
    <input type="text" v-model="wordField" autocomplete="off" />
    <button @click="addToArray">Play game</button>
    <img src="./imgs/cat.jpeg" />
  </div>
  <div v-if="showGame" class="row flex-center">
    <h3>You have 6 chances, good luck :)</h3>
    <h3>The word I was thinking is:</h3>
    <h1 v-if="showWord">{{ rigthWord }}</h1>
    <div
      v-for="letter in word"
      style="border-bottom: 1px solid black; margin: 3px; display: inline"
    >
      <span style="visibility: hidden">{{ letter }}</span>
    </div>
    <input
      type="text"
      v-model="letterField"
      autocomplete="off"
      maxlength="1"
      minlength="1"
    />
    <q-btn round color="purple" glossy label="TRY" @click="playGame" />
    <p v-if="chancesAmount">Chances left:{{ chances }}</p>
    <br />
    <p>Wrong letters: {{ fails }}</p>
  </div>
  <div v-if="endGameWin">
    <p>Congrats, you have guessed correctly!</p>
    <img src="./imgs/happyCats.jpeg" />
  </div>
  <div v-if="endGameLost">
    <p>
      Oh no! Better luck next time.
      <img src="./imgs/catSad.jpeg" />
    </p>
  </div>

  <div v-if="playAgain"><button @click="PlayAgain">Play Again</button></div>
</template>

<script setup>
import { ref, computed } from "vue";

const fails = computed(() => {
  return failedTries;
});
const rigthWord = computed(() => {
  return word;
});
const reg = /^[ça-z]*$/;
const showWordsection = ref(false);
const endGameWin = ref(false);
const endGameLost = ref(false);
const showGame = ref(false);
const showWord = ref(false);
const playAgain = ref(false);
const beforeStartsGame = ref(true);
const chancesAmount = ref(true);
const wordField = ref("");
const letterField = ref("");
const failedTries = [];
const arr2 = [];
const tries = [];
let letters = [];
let word;
let chances = 6;

function startGame() {
  beforeStartsGame.value = !beforeStartsGame.value;
  showWordsection.value = !showWordsection.value;
}

function addToArray() {
  if (wordField.value === "") {
    alert("There's no word in there :(");
    return;
  }
  if (!reg.test(wordField.value)) {
    alert(
      "That character is not allowed in this game :( Please enter a lower cased letter that belongs in our alphabet, with no spaces."
    );
    cleanField();
    return;
  }
  word = wordField.value;
  letters = word.split("");
  console.log(letters);
  showWordsection.value = !showWordsection.value;
  showGame.value = !showGame.value;
}

function playGame() {
  if (letterField.value === "") {
    alert("There's no letters in there :(");
    return;
  }
  console.log(letterField.value);
  if (!reg.test(letterField.value)) {
    alert(
      "That character is not allowed in this game :( Please enter a lower cased letter that belongs in our alphabet, with no spaces."
    );
    cleanField();
    return;
  }
  if (inTries(letterField.value)) {
    alert("This letter was already tested, please try another one");
    cleanField();
    return;
  }
  tries.push(letterField.value);
  if (inWords(letterField.value)) {
    showLetters(letterField.value);
    cleanField();
    isAlive();
    return;
  }
  chances--;
  failedTries.push(letterField.value);
  cleanField();
  isAlive();
}

function isAlive() {
  if (failedTries.length > 5) {
    lost();
  }
  areEqual(letters, arr2);
}

function areEqual(array1, array2) {
  if (array1.length === array2.length) {
    won();
  }
}

function won() {
  showWord.value = !showWord.value;
  endGameWin.value = !endGameWin.value;
  showGame.value = !showGame.value;
  playAgain.value = !playAgain.value;
  changeBackgroundColor("#13D513");
}

function lost() {
  showWord.value = !showWord.value;
  endGameLost.value = !endGameWin.value;
  showGame.value = !showGame.value;
  playAgain.value = !playAgain.value;
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
  for (const elements of document.querySelectorAll("span")) {
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
  return checkIfInside(word.split(""), char);
}

function changeBackgroundColor(color) {
  document.body.style.background = color;
}
</script>
