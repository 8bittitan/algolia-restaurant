import { FN } from "@types";

const debounce = (func: FN<string>) => {
  let timeout: NodeJS.Timeout | null;
  return (...args: string[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      timeout = null;
      func.apply(this, args);
    }, 500);
  };
};

export default debounce;
