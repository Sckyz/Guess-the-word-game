import { defineStore } from "pinia";

export const useTrieStore = defineStore("TrieStore", {
  state: () => {
    return {
      tries: [],
    };
  },
  actions: {
    reset() {
      this.tries = [];
    },
  },
});
