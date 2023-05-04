import { defineStore } from "pinia";

export const useWordStore = defineStore("WordStore", {
  state: () => {
    return {
      word: "",
    };
  },
});
