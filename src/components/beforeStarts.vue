<template>
  <div v-if="beforeStartsGame" class="row flex-center">
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
    <q-separator dark />
    <q-img src="../../public/imgs/catsssss.jpeg" width="50vw" />
    <q-separator vertical dark />
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
    <q-input
      rounded
      standout
      type="text"
      v-model="wordField"
      autocomplete="off"
    />
    <q-btn
      @click="addToArray"
      :ripple="{ color: 'purple' }"
      push
      color="info"
      text-color="white"
      square
      label="Play Game"
      size="20px"
    />
    <q-img src="../../public/imgs/cat.jpeg" width="43vw" />
  </div>
  <div v-if="showGame" class="row flex-center">
    <h3>You have 6 chances, good luck :)</h3>
    <div
      v-for="letter in word"
      style="border-bottom: 1px solid black; margin: 3px; display: inline"
    >
      <span>{{ letter }}</span>
    </div>
    <q-input
      rounded
      standout
      type="text"
      v-model="letterField"
      autocomplete="off"
      maxlength="1"
      minlength="1"
    />
    <q-btn round color="purple" glossy label="TRY" @click="playGame" />
    <p v-if="chancesAmount">Chances left: {{ chances }}</p>
    <br />
    <p>Wrong letters: {{ fails }}</p>
  </div>
  <div v-if="endGameWin">
    <p>Congrats, you have guessed correctly!</p>
    <h1>The word I was thinking is:{{ rigthWord }}</h1>
    <div v-if="playAgain">
      <q-btn
        @click="PlayAgain"
        :ripple="{ color: 'purple' }"
        push
        color="info"
        text-color="white"
        square
        label="Play Again"
        size="20px"
      />
    </div>
    <q-img src="../../public/imgs/happyCats.jpeg" width="30vw" />
  </div>
  <div v-if="endGameLost">
    <p>Oh no! Better luck next time.</p>
    <h1>The word I was thinking is:{{ rigthWord }}</h1>
    <q-img src="../../public/imgs/catSad.jpeg" width="30vw" />
    <div v-if="playAgain">
      <q-btn
        @click="PlayAgain"
        :ripple="{ color: 'purple' }"
        push
        color="info"
        text-color="white"
        square
        label="Play Again"
        size="20px"
      />
    </div>
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
  return checkIfInside(word.value.split(""), char);
}

function changeBackgroundColor(color) {
  document.body.style.background = color;
}
</script>

<style scoped>
span {
  visibility: hidden;
}
</style>
