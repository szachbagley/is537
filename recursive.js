/**
 * @param {string} expression
 * @return {number[]}
 */
const apply = function (a, b, op) {
  if (op === "+") {
    return Number(a) + Number(b);
  } else if (op === "-") {
    return Number(a) - Number(b);
  } else {
    return Number(a) * Number(b);
  }
};

var diffWaysToCompute = function (expression) {
  const operators = new Set(["+", "-", "*"]);
  let results = new Array();
  let base = true;
  for (let i = 0; i < expression.length; i++) {
    if (operators.has(expression[i])) {
      const left = diffWaysToCompute(expression.slice(0, i));
      const right = diffWaysToCompute(
        expression.slice(i + 1, expression.length)
      );
      left.forEach((leftRes) => {
        right.forEach((rightRes) => {
          let result = apply(leftRes, rightRes, expression[i]);
          results.push(result);
        });
      });
      base = false;
    }
  }
  if (base) {
    return [Number(expression)];
  } else {
    return results;
  }
};
