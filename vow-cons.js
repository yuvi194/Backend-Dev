function vowcons(str) {
  let vow = "aeiouAEIOU";
  let v = 0;
  let c = 0;
  for (let ch of str) {
    if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')){
      if (vow.includes(ch)){
        v++;
      } 
      else{
        c++;
      }
    }
  }
  return `Vowels: ${v}, Consonants: ${c}`;
}
console.log(Vowcons("Hello World"));