/* Lab objective: Write a plain JavaScript closure from scratch, prove it remembers a variable, then prove that calling its outer function twice produces two independent closures — no React involved yet. */

function outer() {
  let x = 0

  return function inner() {
    x += 1
    return x

  }

}
const fn = outer()
const fn1 = outer()
fn()
console.log(fn())
console.log(fn1())