#!/usr/bin/env node
// IsPrime.js

function isPrime(number) {
  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

[1, 2, 3, 18, 42, 4612, 21, 1000000000, 65536, 7, 0].forEach((number) => {
  console.log();
});
