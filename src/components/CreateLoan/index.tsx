import { createContext, useEffect, useState } from "react";
import { ILoan, TListLoans } from "../../interfaces/Loan.model";
import { ILoanContext, ICreateLoanProps } from "./interfaces/LoanContext.model";

export const LoanContext = createContext<ILoanContext | null>(null);

/**
 * This component creates the loan context and renders the children that will use it
 * @param props Child that will be passed in
 * @returns JSX.Element
 */
export const CreateLoan = (props: ICreateLoanProps) => {
  //State to hold list of loans inputted by user
  const [listLoans, setListLoans] = useState<TListLoans>([]);
  //State to hold total monthly payment inputted by user
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  //State to hold total minimum monthly payment of loans
  const [minMonthlyPayment, setMinMonthlyPayment] = useState<number>();
  //State to hold total max monthly payment of loans (All loans paid off at once)
  const [maxMonthlyPayment, setMaxMonthlyPayment] = useState<number>();

  /**
   * On mount, it will grab any existing listLoans or monthlyPayment in local storage
   */
  useEffect(() => {
    let tempStoragelistLoans = window.localStorage.getItem("listLoans");
    let tempStorageMonthlyPayment =
      window.localStorage.getItem("monthlyPayment");
    /**
     * If local storage of listLoans exists, set listLoans to that, otherwise make an empty arr
     */
    if (tempStoragelistLoans) {
      let templistLoans = JSON.parse(tempStoragelistLoans);
      setListLoans(templistLoans);
      /**
       * If local storage of monthly payment exists, set monthlyPayment to that.
       * Otherwise, we need to either recalculate monthly payment OR set it to 0 if listLoans is empty
       */
      let tempMinMonthlyPayment = calcMinMonthlyPay(templistLoans);
      let tempMaxMonthlyPayment = calcMaxMonthlyPay(templistLoans);
      setMinMonthlyPayment(tempMinMonthlyPayment);
      setMaxMonthlyPayment(tempMaxMonthlyPayment);
      if (tempStorageMonthlyPayment !== null) {
        setMonthlyPayment(JSON.parse(tempStorageMonthlyPayment));
      } else {
        setMonthlyPayment(tempMinMonthlyPayment);
      }
    } else {
      setMonthlyPayment(0);
      setMaxMonthlyPayment(0);
      setMinMonthlyPayment(0);
    }
  }, []);

  /**
   * Will add all the minimum payments for each loan and return the sum
   * @param arr Array of TListLoans just in case the listLoans state isn't updated
   * @returns Sum of minimum monthly payments
   */
  const calcMinMonthlyPay = (arr: TListLoans): number => {
    let tempMonthlyPayment = 0;
    for (let i = 0; i < arr.length; i++) {
      tempMonthlyPayment += arr[i].minPayment;
    }
    return tempMonthlyPayment;
  };

  /**
   * Will add all the principle amounts for each loan and return the sum
   * @param arr Array of TListLoans just in case the listLoans state isn't updated
   * @returns Sum of principle amounts for all loans
   */
  const calcMaxMonthlyPay = (arr: TListLoans): number => {
    let tempMonthlyPayment = 0;
    for (let i = 0; i < arr.length; i++) {
      tempMonthlyPayment += arr[i].principal;
    }
    return tempMonthlyPayment;
  };

  /**
   * Will set the min and max and monthly payments based off
   * the loan list passed in
   * @param templistLoans List of loans
   */
  const setMinMaxAndMonthly = (templistLoans: TListLoans) => {
    let tempMonthlyPayment = calcMinMonthlyPay(templistLoans);
    let maxPayment = calcMaxMonthlyPay(templistLoans);
    setMinMonthlyPayment(tempMonthlyPayment);
    setMaxMonthlyPayment(maxPayment);
    setMonthlyPayment(tempMonthlyPayment);
    window.localStorage.setItem(
      "monthlyPayment",
      JSON.stringify(tempMonthlyPayment)
    );
    window.localStorage.setItem(
      "MinMonthlyPayment",
      JSON.stringify(tempMonthlyPayment)
    );
    window.localStorage.setItem(
      "MaxMonthlyPayment",
      JSON.stringify(maxPayment)
    );
  };

  /**
   * This will append a loan to the end of listLoans and update the monthly payment
   * @param loan : The loan you want to push at the end of the listLoans
   */
  const addLoan = (loan: ILoan) => {
    let templistLoans = listLoans.slice();
    templistLoans.push(loan);
    setListLoans(templistLoans);

    window.localStorage.setItem("listLoans", JSON.stringify(templistLoans));
    setMinMaxAndMonthly(templistLoans);
  };

  /**
   * Will update an index in listLoans with an updated loan. Will also check to see
   * if monthly payments needs to be updated
   * @param index The index in listLoans you would like to update
   * @param loan The updated loan
   */
  const updateLoan = (index: number, loan: ILoan) => {
    let templistLoans = listLoans.slice();
    templistLoans[index] = loan;
    let tempMonthlyPayment = calcMinMonthlyPay(templistLoans);
    setListLoans(templistLoans);
    window.localStorage.setItem("listLoans", JSON.stringify(templistLoans));
    setMonthlyPayment(tempMonthlyPayment);
    window.localStorage.setItem(
      "monthlyPayment",
      JSON.stringify(tempMonthlyPayment)
    );
    setMinMaxAndMonthly(templistLoans);
  };

  /**
   * This will remove a loan from the list and update listLoans to the new list. It will, however,
   * not update monthly payments as that amount will be higher than the sum of all minimum payments
   * @param index Index in listLoans you would like to remove
   */
  const removeLoan = (index: number) => {
    if (listLoans && listLoans[index]) {
      let templistLoans = listLoans.slice();
      templistLoans.splice(index, 1);
      setListLoans(templistLoans);
      window.localStorage.setItem("listLoans", JSON.stringify(templistLoans));
      setMinMaxAndMonthly(templistLoans);
    }
  };

  /**
   * Will update the monthly payment state and set it in local storage
   * @param monthlyPayment The user specified monthly payment
   */
  const updateMonthlyPayment = (monthlyPayment: number) => {
    setMonthlyPayment(monthlyPayment);
    window.localStorage.setItem(
      "monthlyPayment",
      JSON.stringify(monthlyPayment)
    );
  };

  return (
    <div>
      <LoanContext.Provider
        value={{
          listLoans: listLoans,
          monthlyPayment: monthlyPayment,
          minMonthlyPayment: minMonthlyPayment,
          maxMonthlyPayment: maxMonthlyPayment,
          updateMonthlyPayment: updateMonthlyPayment,
          addLoan: addLoan,
          updateLoan: updateLoan,
          removeLoan: removeLoan,
        }}
      >
        {props.children}
      </LoanContext.Provider>
    </div>
  );
};
