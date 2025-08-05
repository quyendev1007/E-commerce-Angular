export function debounce(
  func: (arg: string) => void,
  waitFor: number
): (arg: string) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (arg: string): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(arg);
    }, waitFor);
  };
}
