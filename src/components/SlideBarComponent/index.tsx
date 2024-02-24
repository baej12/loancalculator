import { useContext, useEffect, useState } from "react";
import { restrictToTwoDecimal } from "../../utils/numberRest";
import { LoanContext } from "../CreateLoan";
import "./index.css";

/**
 * This component creates a slide bar for users to choose their monthly payment
 * The input options are the slider or the input box to enter explicit values
 * @returns jsx.Element, the CSS/HTML for the bar and input box
 */
export const SlideBarComponent = () => {
  const loanContext = useContext(LoanContext);
  //State to hoold the current lowest value of monthly payments for the slider
  const [value, setValue] = useState<number>(loanContext?.monthlyPayment || 0);
  /**
   * checks to see if the loanContext?.monthlyPayment has changed
   * if there is a change then it checks to make sure it is more than the
   * value for the text box. If that is true then the value is set to
   * loanContext?.monthlyPayment, essentially checking for a new min then setting it
   */
  useEffect(() => {
    if (loanContext?.monthlyPayment || 0 > value) {
      setValue(loanContext?.monthlyPayment || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanContext?.monthlyPayment]);

  return (
    <div className="sliderContainer">
      <div>Monthly Payment</div>
      <div className="money-container2">
        <input
          className="slider"
          type="Range"
          min={loanContext?.minMonthlyPayment}
          max={loanContext?.maxMonthlyPayment}
          value={value}
          onChange={(e) => {
            loanContext?.updateMonthlyPayment(+e.target.value);
          }}
        />
        <div className="money-container">
          <div>$</div>
          <input
            type="number"
            className="sliderValue"
            min={loanContext?.minMonthlyPayment}
            max={loanContext?.maxMonthlyPayment}
            value={
              !loanContext?.monthlyPayment
                ? undefined
                : loanContext?.monthlyPayment
            }
            onChange={(e) => {
              restrictToTwoDecimal(e);
              let val = +e.target.value;
              loanContext?.updateMonthlyPayment(val);
            }}
          />
        </div>
      </div>
    </div>
  );
};
