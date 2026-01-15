function removechar(str1, str2) {
  let result = "";
  for (let c of str1) {
    if (!str2.includes(c)) {
      result += c;
    }
  }
  return result;
}
console.log(removechar("hello world", "od"));