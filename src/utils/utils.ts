export function debounce(callback: Function, wait: number) {
  let timeoutId: number;
  return (...args: any[]) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

export function throttle(callback: Function, wait: number) {
  let timeoutId: number | null = null;
  return (...args: any[]) => {
    if (timeoutId === null) {
      callback.apply(null, args);
      timeoutId = window.setTimeout(() => {
        timeoutId = null;
      }, wait);
    }
  };
}
