/**
 * Formats the given number so that it can be displayed as a monetary amount
 * @param amount
 * @returns formatted string
 */
export const parseAmount = (amount: number) => {
  let amountString: string = amount.toFixed(2);

  let count = 0;
  for (
    let i = amountString.includes(".")
      ? amountString.indexOf(".") - 1
      : amountString.length - 1;
    0 <= i;
    i--
  ) {
    count++;
    if (count % 3 === 0 && 0 <= i - 1) {
      amountString = amountString.slice(0, i) + "," + amountString.slice(i);
    }
  }

  return amountString;
};

/**
 * This function is called everytime a user input changes, it will make sure that
 * the current input has only one decimal point and that theres only two numbers
 * after the decimal point.
 * @param event
 * @param max
 */
export const restrictToTwoDecimal = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  //counter for how many decimal points we detect
  let decimalPoints = 0;
  //save index of first decimal point
  let decimalIndex = 0;

  //search for decimal points in value
  for (let i = 0; i < event.target.value.length && decimalPoints < 2; i++) {
    if (event.target.value.charAt(i) === ".") {
      decimalPoints++;
      decimalIndex = decimalPoints === 1 ? i : decimalIndex;
    }
  }

  //if we have more than two decimal points we remove the second one
  if (decimalPoints > 1) {
    event.target.value = event.target.value.slice(0, -1);
  }
  //if we only have one decimal point then we make sure that there's only two numbers after it
  else if (decimalPoints === 1) {
    let afterDecimal = event.target.value.slice(decimalIndex);
    if (afterDecimal.length > 3) {
      event.target.value = event.target.value.slice(0, -1);
    }
  }
};

/**
 * This function makes sure that we can only press numeric keys and the "." key for decimal
 * numbers
 * @param event
 */
export const enforceNumberInput = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  let keyPressed = +event.key;

  //if the key is not numeric or is not a "." then we ignore key press
  if (event.key !== "." && Number.isNaN(keyPressed)) {
    event.preventDefault();
  }
};
