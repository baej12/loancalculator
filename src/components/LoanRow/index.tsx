import { useContext, useState } from "react";
import { LoanContext } from "../CreateLoan";
import { LoanComponent } from "../LoanComponent";
import { ILoanRowProps } from "./interfaces/LoanRow.model";
import alert from "../../assets/alert.svg";
import cross from "../../assets/cross.svg";
import pencil from "../../assets/pencil.svg";
import "./LoanRow.css";
import { parseAmount } from "../../utils/numberRest";

/**
 * Will display the loan and its information in row format. It will also give the user...
 * an option to edit or delete the loan. Clicking on the edit icon will bring down a component...
 * that allows the user to edit any information about the loan
 *
 * @param props
 *    - ***index***: Index is the index in loanList where the *loan* is located in
 *    - ***loan***: The loan whose information we want to display
 * @returns A loan row that shows the loan information as well as options to either delete...
 *          that loan or edit it with new information
 */
export const LoanRow = (props: ILoanRowProps) => {
  //Display toggles controls whether the drop down menu appears to edit a loan
  const [displayToggle, setDisplayToggle] = useState<boolean>(false);
  //Loan context is present so that we can delete the given loan
  const loanContext = useContext(LoanContext);
  //Index is the index in loanList and loan is the loan whose information we display
  const { index, loan } = props;

  return (
    <div className="RowWithLoans">
      {/* Display the information about the loans in a row */}
      <div
        className={
          loan.minPayment > (loan.principal * loan.interest) / 12
            ? "LoanRowLoanInfo"
            : "LoanRowLoanInfo ErrorMessage"
        }
      >
        <div className="LoanRowLoanName">{loan.loanName}</div>
        <div className="LoanRowLoanPrincipal">
          ${parseAmount(loan.principal)}
        </div>
        <div className="LoanRowInterest">
          {(loan.interest * 100).toFixed(2)}%
        </div>
        <div className="LoanRowMinPay">${parseAmount(loan.minPayment)}</div>
        <div className="LoanRowActionButtons">
          <div className="LoanRowEditButtonOuterDiv">
            <div
              className="LoanRowEditButton"
              onClick={() => {
                setDisplayToggle(!displayToggle);
              }}
            >
              {" "}
              <img src={pencil} alt="Edit Button" />
            </div>
          </div>
          <div className="LoanRowDelButtonOuterDiv">
            <div
              className="LoanRowDelButton"
              onClick={() => {
                loanContext?.removeLoan(index);
              }}
            >
              <img src={cross} alt="Cross Button" />
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* The error message that will display if the minimum payment is lower than the amount gained via interest */}
        {loan.minPayment > (loan.principal * loan.interest) / 12 ? null : (
          <div className="LoanRowLowMinPayError">
            <div className="LoanRowErrorLogo">
              <img src={alert} alt="Alert Button" height="20" width="20" />
            </div>
            <div className="Error">
              We simulated your current payment plan and could not pay off all
              the loan. <br></br> This usually occurs from interest growing
              faster than you're paying off principal.
            </div>
          </div>
        )}
      </div>
      {/* The edit drop down that appears if the user clicks on the edit button */}
      <div className="LoanRowEditDisplay">
        {displayToggle ? <LoanComponent edit={index} /> : null}
      </div>
    </div>
  );
};
