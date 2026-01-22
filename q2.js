function capital(s) {
    return s[0].toUpperCase() + s.slice(1);
}
function reverses(s) {
    return s.split("").reverse().join("");
}
function vowel(s) {
    let count = 0;
    let vowel = "aeiouAEIOU";
    for (let ch of s) {
        if (vowel.includes(ch)) {
            count++;
        }
    }
    return count;
}
module.exports = {
    capital,
    reverses,
    vowel
};