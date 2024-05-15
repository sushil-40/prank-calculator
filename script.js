const allButtonsElm = document.querySelectorAll(".btn");
// console.log(allButtonsElm);
let strToDisplay = "";
const displayElm = document.querySelector(".display");

const operators = ["%", "/", "*", "+", "-", "="];

const buttonAction = (value) => {
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
    const lastChar = strToDisplay[strToDisplay.length - 1];

    if (operators.includes(lastChar)) {
      strToDisplay = strToDisplay.slice(0, -1);
    }
  }

  strToDisplay += value;

  display(strToDisplay);
};

//attach click event to all the buttons
allButtonsElm.forEach((btn) => {
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
  const total = eval(strToDisplay);

  strToDisplay = total.toString();
  //   console.log(total);

  display(strToDisplay);
};
