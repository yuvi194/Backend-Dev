function nonrepeat(str) {
  for (let c of str) {
    if (str.indexOf(c) === str.lastIndexOf(c)) {
      return c;
    }
  }
  return null;
}
console.log(nonrepeat("swiss"));