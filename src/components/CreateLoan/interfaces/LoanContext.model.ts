import { ILoan } from "../../../interfaces/Loan.model";

/**
 * ILoanContext will make availabe:
 *
 *  > **listLoans**           : The list of loans
 *
 *  > **monthlyPayment**      : The amount user wants to pay on each loan
 *
 *  > **minMonthlyPayment**   : The minimum monthly payment
 *
 *  > **maxMonthlyPayment**   : The maximum monthly payment
 *
 *  > **updateMonthlyPayment**: A function to change *monthlyPayment*
 *
 *  > **addLoan**             : A function to add loans to *listLoans*
 *
 *  > **updateLoan**          : A function to edit and update a loan
 *
 */
export interface ILoanContext {
  listLoans: Array<ILoan> | null;
  monthlyPayment: number | null;
  minMonthlyPayment: number | undefined;
  maxMonthlyPayment: number | undefined;
  updateMonthlyPayment: (monthlyPayment: number) => void;
  addLoan: (loan: ILoan) => void;
  updateLoan: (index: number, loan: ILoan) => void;
  removeLoan: (index: number) => void;
}

/**
 * Passes in child to render
 */
export interface ICreateLoanProps {
  children: JSX.Element;
}
