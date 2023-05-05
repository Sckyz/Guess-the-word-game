import { defineStore } from "pinia";

export const useWordStore = defineStore("WordStore", {
  state: () => {
    return {
      word: "",
    };
  },
  actions: {
    setValue(value) {
      this.word = value
    }
  },
});
