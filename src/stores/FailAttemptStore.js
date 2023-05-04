import { defineStore } from "pinia";

export const useFailAttemptStore = defineStore("FailAttemptStore", {
  state: () => {
    return {
      fails: [],
    };
  },
  actions: {
    reset() {
      this.fails = [];
    },
  },
});
