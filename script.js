const allButtonsElm = document.querySelectorAll(".btn");
// console.log(allButtonsElm);
let strToDisplay = "";
const displayElm = document.querySelector(".display");

const operators = ["%", "/", "*", "+", "-", "="];

let lastOperator = "";

//Load the audio
const audio = new Audio("./assets/surprise.mp3");

const buttonAction = (value) => {
  displayElm.classList.remove("prank");
  console.log(value);

  if (value === "AC") {
    strToDisplay = "";
    return display(strToDisplay);
  }

  if (value === "C") {
    strToDisplay = strToDisplay.slice(0, -1);
    return display(strToDisplay);
  }

  if (value === "=") {
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
    const lastChar = strToDisplay[strToDisplay.length - 1];

    if (operators.includes(lastChar)) {
      strToDisplay = strToDisplay.slice(0, -1);
    }
  }

  // Allowing only one dot per number set

  if (value === ".") {
    const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);
    const lastNumberSet = strToDisplay.slice(lastOperatorIndex);
    if (lastNumberSet.includes(".")) {
      return;
    }

    if (!lastOperator && strToDisplay.includes(".")) {
      return;
    }
  }

  strToDisplay += value;

  display(strToDisplay);
};

//attach click event to all the buttons
allButtonsElm.forEach((btn) => {
  btn.addEventListener("mousedown", () => {
    btn.style.scale = ".9";
  });

  //   console.log(btn.innerText);
  btn.addEventListener("click", () => {
    const value = btn.innerText;
    buttonAction(value);
  });
});

//update clicked button vlaue to display area

const display = (str) => {
  displayElm.innerText = str || "0.0";
};

//Calculate total

const displayTotal = () => {
  const extraValue = randomValue();
  if (extraValue) {
    displayElm.classList.add("prank");
    audio.play();
  }

  const total = eval(strToDisplay);

  strToDisplay = total.toString();
  //   console.log(total);

  display(strToDisplay);
};

const randomValue = () => {
  const num = Math.round(Math.random() * 10);

  return num < 4 ? num : 0;
};
