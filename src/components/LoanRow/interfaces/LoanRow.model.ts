import { ILoan } from "../../../interfaces/Loan.model";

/**
 * index: Where in listLoan the loan is located
 * loan: The loan you would like to display in the loan row component
 */
export interface ILoanRowProps {
  index: number;
  loan: ILoan;
}
