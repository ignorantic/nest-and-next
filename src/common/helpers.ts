export function fromRange(from: number, to: number): number {
  return Math.round(Math.random() * (to - from)) + from;
}
