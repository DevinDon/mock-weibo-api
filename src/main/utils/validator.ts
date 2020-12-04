export function isValidURL(url: string) {
  const regexp = /http[s]?:\/\/.*/;
  return regexp.test(url);
}
