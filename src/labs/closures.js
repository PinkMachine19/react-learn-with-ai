// Session 18.5 — Lab: prove closures are per-call, not shared

function makeCounter() {
  let count = 0;

  return function increment() {
    count = count + 1;
    return count;
  };
}

const counter1 = makeCounter();

console.log(counter1());   // expect 1
console.log(counter1());   // expect 2
console.log(counter1());   // expect 3

const counter2 = makeCounter();

console.log(counter2());   // expect 1 — NOT 4, its own fresh count
console.log(counter1());   // expect 4 — counter1's count kept going, unaffected
