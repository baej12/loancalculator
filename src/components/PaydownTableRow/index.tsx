import { useState } from "react";
import { parseAmount } from "../../utils/numberRest";
import { IPaydownRowProps } from "./interfaces/PaydownTableRow.model";
import "./PaydownTableRow.css";

/**
 * This displays the rows for the monthly payments and the breakdown payments
 * for each loan in the Paydown Table.
 * @param props
 * @returns
 */
export const PaydownTableRow = (props: IPaydownRowProps) => {
  const { monthlyBreakdown } = props;
  //holds information about the monthly payments and infromation
  //a boolean representing whether the dropdown button has been clicked or not
  const [isDropDown, setIsDropdown] = useState(false);

  return (
    <div>
      <div className="MonthlyPayment Row">
        <div className="Element">{monthlyBreakdown.month}</div>
        <div className="Element">
          ${parseAmount(monthlyBreakdown.monthBreakdown.principalPaid)}
        </div>
        <div className="Element">
          ${parseAmount(monthlyBreakdown.monthBreakdown.interestPaid)}
        </div>
        <div className="Element">
          {monthlyBreakdown.monthBreakdown.piRatio.toFixed(2)}
        </div>
        <div className="Element">
          ${parseAmount(monthlyBreakdown.monthBreakdown.amountPaid)}
        </div>

        <div className="ButtonColumn Element">
          <button
            className={
              isDropDown ? "HideDetailsButton but" : "SeeDetailsButton but"
            }
            onClick={() => {
              setIsDropdown(!isDropDown);
            }}
          >
            {isDropDown ? "Hide Details" : "See Details"}
          </button>
        </div>
      </div>
      {isDropDown ? (
        <div>
          {monthlyBreakdown.loansBreakdown.map((loan, index) => {
            return (
              <div
                className="Row LoanPayment"
                key={
                  loan.loanName +
                  loan.piRatio +
                  loan.principalPaid +
                  "-" +
                  index.toString()
                }
              >
                <div className="Element">{loan.loanName}</div>
                <div className="Element">${loan.principalPaid.toFixed(2)}</div>
                <div className="Element">${loan.interestPaid.toFixed(2)}</div>
                <div className="Element">{loan.piRatio.toFixed(2)}</div>
                <div className="Element">${loan.amountPaid.toFixed(2)}</div>
                <div className="Element">
                  <button className="but Invisible">Hide Details</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};
