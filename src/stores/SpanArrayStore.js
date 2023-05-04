import { defineStore } from "pinia";

export const useSpanArrayStore = defineStore("SpanArrayStore", {
  state: () => {
    return {
      spans: [],
    };
  },
  actions: {
    reset() {
      this.spans = [];
    },
  },
});
