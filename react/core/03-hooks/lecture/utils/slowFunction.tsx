// Mimic having a very slow function...
export default function slowFunction(x: any) {
  for (let index = 0; index < 800_000_000; index++) {
    // do nothing, but be slow
  }
}
