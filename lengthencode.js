function lengthencode(str) {
  let result = "";
  let p = 1;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      p++;
    }
    else {
      result += str[i] + p;
      p = 1;
    }
  }
  return result;
}
console.log(lengthencode("aaabbc"));