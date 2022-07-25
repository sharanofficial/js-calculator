const display1 = document.querySelector(".display-1");
const display2 = document.querySelector(".display-2");
const tempResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const backspaceBtn = document.querySelector(".backspace");

let dis1 = "";
let dis2 = "";
let haveDot = false;
let lastOperation = "";
let result = null;

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    value = e.target.innerText;
    if (value === "." && !haveDot) {
      haveDot = true;
    } else if (value === "." && haveDot) {
      return;
    }
    dis2 += value;
    display2.innerText = dis2;
  });
});

operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    haveDot = false;
    opType = e.target.innerText;
    if (!dis2) {
      return;
    } else if (dis1 && dis2 && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dis2);
    }
    clearDis2(opType);
    lastOperation = opType;
  });
});

const clearDis2 = (name = "") => {
  dis1 += dis2 + " " + name + " ";
  display1.innerText = dis1;
  dis2 = "";
  display2.innerText = dis2;
  tempResult.innerText = result;
};

const mathOperation = () => {
  if (opType === "+") {
    result = parseFloat(result) + parseFloat(dis2);
  } else if (opType === "-") {
    result = parseFloat(result) - parseFloat(dis2);
  } else if (opType === "x") {
    result = parseFloat(result) * parseFloat(dis2);
  } else if (opType === "/") {
    result = parseFloat(result) / parseFloat(dis2);
  } else if (opType === "%") {
    result = parseFloat(result) % parseFloat(dis2);
  }
};

equalBtn.addEventListener("click", () => {
  if (!dis1 && !dis2) {
    return;
  }
  haveDot = false;
  mathOperation();
  clearDis2();
  dis2 = result;
  display2.innerText = dis2;
  tempResult.innerText = "";
  dis1 = "";
});

clearBtn.addEventListener("click", () => {
  dis1 = "";
  dis2 = "";
  display1.innerText = "0";
  display2.innerText = "0";
  tempResult.innerText = "0";
  result = "";
});

backspaceBtn.addEventListener("click", () => {
  if (dis2.slice(-1) === ".") {
    haveDot = false;
  }
  dis2 = dis2.slice(0, -1);
  display2.innerText = dis2;
});

// Keyboard

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButton(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");
  } else if (e.key === "Enter" || e.key === "=") {
    clickEqual();
  } else if (e.key === "Backspace") {
    clickBackspace();
  }
});

const clickButton = (key) => {
  numbers.forEach((number) => {
    if (number.innerText === key) {
      number.click();
    }
  });
};

const clickOperation = (key) => {
  operations.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
};

const clickEqual = () => {
  equalBtn.click();
};

const clickBackspace = () => {
  backspaceBtn.click();
};
