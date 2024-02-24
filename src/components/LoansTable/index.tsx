import { useCallback, useContext } from "react";
import { LoanContext } from "../CreateLoan";
import { LoanRow } from "../LoanRow";
import { TableWrapper } from "../TableWrapper";

/**
 * Creates the Input Parent Table that shows all of the users loans by using the
 * TableWrapper component and the LoanRow component
 * @returns
 */
export const LoansTable = () => {
  // The labels for the input table
  const labels = ["Loan Name", "Principal", "Interest", "Minimum Payment"];
  // Getting the list of loans and their information from the context
  const loanContext = useContext(LoanContext);

  /**
   * Everytime the list of loans is updated, the list gets updated to contain all
   * of the loans and this callback returns that list.
   */
  const updateArray = useCallback(() => {
    let tempArray = [];
    if (loanContext && loanContext.listLoans) {
      for (let i = 0; i < loanContext.listLoans.length; i++) {
        tempArray.push(
          <LoanRow
            key={loanContext.listLoans[i].key}
            index={i}
            loan={loanContext.listLoans[i]}
          />
        ); //Just pull from Brandon and should have the info
      }
      return tempArray;
    } else {
      return [];
    }
  }, [loanContext]);

  return (
    <div>
      <TableWrapper
        title={"Loans"}
        columnHeaders={labels}
        rows={updateArray()}
        isUsingPages={false}
      />
    </div>
  );
};
