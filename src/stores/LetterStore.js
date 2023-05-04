import { defineStore } from "pinia";

export const useLetterStore = defineStore("LetterStore", {
  state: () => {
    return {
      letter: [],
    };
  },
  actions: {
    reset() {
      this.letter = [];
    },
  },
});
