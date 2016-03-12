export function connectionError(reason) {
  throw new Error(`Connection Error: ${reason}`);
}
