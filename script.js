const allButtonsElm = document.querySelectorAll(".btn");

let strToDisplay = "";
const displayElm = document.querySelector(".display");

const operators = ["%", "/", "*", "-", "+"];

let lastOperator = "";

//Load the audio
const audio = new Audio("./assets/surprise.mp3");

const buttonAction = (value) => {
  displayElm.classList.remove("prank");

  if (value === "AC") {
    strToDisplay = "";
    return display(strToDisplay);
  }

  if (value === "C") {
    strToDisplay = strToDisplay.slice(0, -1);
    return display(strToDisplay);
  }

  if (value === "=" || value === "Enter") {
    lastOperator = "";
    //get the last char
    const lastChar = strToDisplay[strToDisplay.length - 1];

    // check if it is one of the operators
    if (operators.includes(lastChar)) {
      strToDisplay = strToDisplay.slice(0, -1);
    }

    return displayTotal();
  }

  // show only last clicked operator
  if (operators.includes(value)) {
    lastOperator = value;
    //get the last char
    const lastChar = strToDisplay[strToDisplay.length - 1];

    if (operators.includes(lastChar)) {
      strToDisplay = strToDisplay.slice(0, -1);
    }
  }

  //handle the dot click

  if (value === ".") {
    const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);

    const lastNumebrSet = strToDisplay.slice(lastOperatorIndex);

    if (lastNumebrSet.includes(".")) {
      return;
    }

    if (!lastOperator && strToDisplay.includes(".")) {
      return;
    }
  }

  strToDisplay += value;

  display(strToDisplay);
};

//attache click event to all the buttons
allButtonsElm.forEach((btn) => {
  btn.addEventListener("mousedown", () => {
    btn.style.scale = ".9";
  });

  btn.addEventListener("click", () => {
    btn.style.scale = "1";
    const value = btn.innerText;
    buttonAction(value);
  });
});

// update clicked button value to display area
const display = (str) => {
  displayElm.innerText = str || "0.0";
};

// calculate total
const displayTotal = () => {
  const extraValue = randomValue();
  if (extraValue) {
    displayElm.classList.add("prank");
    audio.play();
  }

  const total = eval(strToDisplay) + extraValue;

  strToDisplay = total.toString();
  display(strToDisplay);
};

const randomValue = () => {
  const num = Math.round(Math.random() * 10); // 0 - 10
  return num < 4 ? num : 0;
};

// Binding keyboard with browser app
document.addEventListener("keypress", (e) => {
  console.log(e);
  const value = e.key;
  if (e.code.includes("Key")) {
    return;
  }
  buttonAction(value);
});
