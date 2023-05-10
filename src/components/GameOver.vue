<template>
  <div :class="values.color" class="main column flex-center" v-if="box.div">
    <span>{{ values.message }} </span>
    <q-separator color="black" spaced />
    <WordAnswer />
    <q-img
      class="rounded-borders q-ml-xl q-mr-lg"
      width="20vw"
      :src="values.img"
    />
    <MyButton label="Play Again" size="30px" @click="playAgain(box)" />
  </div>
  <HomePage v-if="box.home" />
</template>

<script setup>
import MyButton from "./MyButton.vue";
import WordAnswer from "./WordAnswer.vue";
import HomePage from "../components/HomePage.vue";
import { reactive, computed } from "vue";
import { playAgain } from "../helpers/index";
import { useMyStores } from "../stores/MyStores";

const store = useMyStores();

const box = reactive({
  div: true,
  home: false,
});

const props = defineProps({
  win: Boolean,
});

const values = computed(() => {
  if (store.getGameValue) {
    return {
      message: "Congrats, you have guessed correctly! :)",
      img: "WonCat.jpeg",
      color: "bg-green-5",
    };

  }
  return {
    message: "Oh no! Good luck next time :(",
    img: "LostCat.jpeg",
    color: "bg-red-10",
  };
});
</script>

<style scoped>
.main {
  height: 100vh;
  width: 100vw;
}
span {
  font-size: 75px;
}
</style>
