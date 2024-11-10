export function padStart(num: number, len: number = 2, str: string = "0") {
  return num.toString().padStart(len, str);
}

export function getRandom(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
