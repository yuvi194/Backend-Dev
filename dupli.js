function dupli(str) {
  let freq = {};
  let result = [];
  for (let ch of str) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  for (let ch in freq) {
    if (freq[ch] > 1) result.push(ch);
  }
  return result;
}
console.log(dupli("programming"));