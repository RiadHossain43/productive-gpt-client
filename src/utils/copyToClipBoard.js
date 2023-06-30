export async function copyToClipboard(value, cb = function () {}) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(value);
    setTimeout(() => cb, 1000);
  }
}
