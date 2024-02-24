import React, { useContext, useState } from "react";
import { ILoanComponentProps } from "./interface/LoanComponent.model";
import "./LoanComponent.css";
import {
  enforceNumberInput,
  restrictToTwoDecimal,
} from "../../utils/numberRest";
import { LoanContext } from "../CreateLoan";
import { ILoan } from "../../interfaces/Loan.model";
import { v4 as uuidv4 } from "uuid";

/**
 * Component that allows user to create or update a loan.
 * Takes in an optional `edit` prop which is a index of compoent to be updated.
 * @param props
 * @returns
 */
export const LoanComponent = (props: ILoanComponentProps) => {
  //extract the loan we want to edit if it's provided
  const { edit } = props;

  //extract context to update the list of loans
  const loanContext = useContext(LoanContext);

  //internal states for the loan details
  const [loanName, setLoanName] = useState(
    edit !== undefined && loanContext?.listLoans
      ? loanContext?.listLoans[edit].loanName
      : ""
  );
  const [principal, setPrincipal] = useState(
    edit !== undefined && loanContext?.listLoans
      ? loanContext?.listLoans[edit].principal
      : 0
  );
  const [interest, setInterest] = useState(
    edit !== undefined && loanContext?.listLoans
      ? loanContext?.listLoans[edit].interest
      : 0
  );
  const [minPay, setMinPay] = useState(
    edit !== undefined && loanContext?.listLoans
      ? loanContext?.listLoans[edit].minPayment
      : 0
  );

  //track if any input field is empty upon submit request
  const [loanNameErr, setLoanNameErr] = useState(false);
  const [principalErr, setPrincipalErr] = useState(false);
  const [interestErr, setInterestErr] = useState(false);
  const [minPayErr, setMinPayErr] = useState(false);

  /**
   * This function is called by our Update/New button.
   * The funcion will take all the validated input from the user stored in
   * the internal states and use the `loanContext` to push the new loan or update
   * a pre-existing loan
   */
  const newOrUpSubmit = () => {
    //variable to check if we're ready to submit
    let readyTosubmit = true;

    //check that all states are valid
    if (!loanName) {
      setLoanNameErr(true);
      readyTosubmit = false;
    } else {
      setLoanNameErr(false);
    }
    if (!principal) {
      setPrincipalErr(true);
      readyTosubmit = false;
    } else {
      setPrincipalErr(false);
    }
    if (!interest) {
      setInterestErr(true);
      readyTosubmit = false;
    } else {
      setInterestErr(false);
    }
    if (!minPay) {
      setMinPayErr(true);
      readyTosubmit = false;
    } else {
      setMinPayErr(false);
    }

    if (!readyTosubmit) return;

    //create temporary ILoan object from the internal state data
    let tmp: ILoan = {
      loanName: loanName,
      principal: principal,
      interest: interest,
      minPayment: minPay,
      key: uuidv4(),
    };

    //if we are given an index for a loan to edit then we edit that existing loan, otherwise
    //we create a new one
    if (edit !== undefined) {
      loanContext?.updateLoan(edit, tmp);
    } else {
      loanContext?.addLoan(tmp);
    }
  };

  return (
    <div className="LoanComponent">
      <div className="RowInput">
        <div className="LoanName">
          <label className="leftLab" htmlFor="interestIn">
            Loan Name
          </label>
          {loanNameErr ? (
            <input
              className="LoanNameErr"
              type="text"
              defaultValue={
                edit !== undefined && loanContext?.listLoans
                  ? loanContext?.listLoans[edit].loanName
                  : ""
              }
              onChange={(e) => {
                setLoanName(e.target.value);
              }}
            />
          ) : (
            <input
              className="LoanNameinput"
              type="text"
              defaultValue={
                edit !== undefined && loanContext?.listLoans
                  ? loanContext?.listLoans[edit].loanName
                  : ""
              }
              onChange={(e) => {
                setLoanName(e.target.value);
              }}
            ></input>
          )}
          {loanNameErr ? (
            <div className="leftLab">
              <span className="Err">This field is required</span>
            </div>
          ) : undefined}
        </div>
        <div className="PrinBal">
          <label className="leftLab" htmlFor="PrinBalIn">
            Principal Balance Remaining
          </label>
          {principalErr ? (
            <input
              id="PrinBalIn"
              className="PrinBalErr"
              type="number"
              defaultValue={
                edit !== undefined && loanContext?.listLoans
                  ? loanContext?.listLoans[edit].principal
                  : ""
              }
              onKeyPress={(e) => {
                enforceNumberInput(e);
              }}
              onChange={(e) => {
                restrictToTwoDecimal(e);
                setPrincipal(+e.target.value);
              }}
            ></input>
          ) : (
            <input
              id="PrinBalIn"
              className="PrinBalinput"
              type="number"
              defaultValue={
                edit !== undefined && loanContext?.listLoans
                  ? loanContext?.listLoans[edit].principal
                  : ""
              }
              onKeyPress={(e) => {
                enforceNumberInput(e);
              }}
              onChange={(e) => {
                restrictToTwoDecimal(e);
                setPrincipal(+e.target.value);
              }}
            ></input>
          )}
          {principalErr ? (
            <div className="leftLab">
              <span className="Err">This field is required</span>
            </div>
          ) : undefined}
        </div>
        <div className="InterestRate">
          <label className="leftLab" htmlFor="interestIn">
            Interest Rate
          </label>
          {interestErr ? (
            <input
              id="interestIn"
              className="InterestRateErr"
              type="number"
              defaultValue={
                edit !== undefined && loanContext?.listLoans
                  ? loanContext?.listLoans[edit].interest
                  : ""
              }
              onKeyPress={(e) => {
                enforceNumberInput(e);
              }}
              onChange={(e) => {
                restrictToTwoDecimal(e);
                if (+e.target.value > 100) {
                  e.target.value = e.target.value.slice(0, -1);
                }
                setInterest(+e.target.value / 100);
              }}
            ></input>
          ) : (
            <input
              id="interestIn"
              className="InterestRateinput"
              type="number"
              defaultValue={
                edit !== undefined && loanContext?.listLoans
                  ? (loanContext?.listLoans[edit].interest * 100).toFixed(2)
                  : ""
              }
              onKeyPress={(e) => {
                enforceNumberInput(e);
              }}
              onChange={(e) => {
                restrictToTwoDecimal(e);
                if (+e.target.value > 100) {
                  e.target.value = e.target.value.slice(0, -1);
                }
                setInterest(+e.target.value / 100);
              }}
            ></input>
          )}
          {interestErr ? (
            <div className="leftLab">
              <span className="Err">This field is required</span>
            </div>
          ) : undefined}
        </div>
        <div className="MinPay">
          <label className="leftLab" htmlFor="">
            Minimum Payment
          </label>
          {minPayErr ? (
            <input
              className="MinPayErr"
              type="number"
              defaultValue={
                edit !== undefined && loanContext?.listLoans
                  ? loanContext?.listLoans[edit].minPayment
                  : ""
              }
              onKeyPress={(e) => {
                enforceNumberInput(e);
              }}
              onChange={(e) => {
                restrictToTwoDecimal(e);
                setMinPay(+e.target.value);
              }}
            ></input>
          ) : (
            <input
              className="MinPayInput"
              type="number"
              defaultValue={
                edit !== undefined && loanContext?.listLoans
                  ? loanContext?.listLoans[edit].minPayment
                  : ""
              }
              onKeyPress={(e) => {
                enforceNumberInput(e);
              }}
              onChange={(e) => {
                restrictToTwoDecimal(e);
                setMinPay(+e.target.value);
              }}
            ></input>
          )}
          {minPayErr ? (
            <div className="leftLab">
              <span className="Err">This field is required</span>
            </div>
          ) : undefined}
        </div>
      </div>
      <div className="NewUpdateButton">
        <button
          onClick={() => {
            newOrUpSubmit();
          }}
        >
          {edit !== undefined ? "Update" : "Add new loan"}
        </button>
      </div>
    </div>
  );
};
