export function handleCallback(callback, ...data) {
  if (callback && typeof callback === 'function') {
    callback(...data);
  }
}
