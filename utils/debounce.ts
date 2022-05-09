type Callback = (...args: string[]) => void;

const debounce = (func: Callback) => {
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
