import { useMyStores } from "../stores/MyStores.js";

export function playAgain(args) {
  const store = useMyStores();
  args.div = false;
  args.home = true;
  store.reset();
}

export function cleanField(field) {
  field.value = "";
}
