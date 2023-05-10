import { defineStore } from "pinia";

export const useMyStores = defineStore("MyStores", {
  state: () => {
    return {
      fails: [],
      letter: [],
      spans: [],
      tries: [],
      word: "",
      gameValue: false,
    };
  },
  actions: {
    setGameValue(value) {
      return (this.$state.gameValue = value);
    },
    setValue(value) {
      this.word = value;
    },
    reset() {
      this.fails = [];
      this.letter = [];
      this.spans = [];
      this.tries = [];
    },
  },
  getters: {
    getGameValue(state) {
      return state.gameValue;
    },
  },
});
