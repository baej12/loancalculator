/**
 * ILoan is the base entry for a loan. Each loan is expected to have:
 *  > **loanName**  : name of the loan
 *
 *  > **principal** : principal amount left on loan
 *
 *  > **interest**  : interest rate for the loan
 *
 *  > **minPayment**: minimum payment required by the loan
 * 
 *  > **key**       : unique key for each loan
 */
export interface ILoan {
  loanName: string;
  principal: number;
  interest: number;
  minPayment: number;
  key: string;
}

/**
 * To store and display loans, loans will be kept in an **Array** of type **ILoan**
 */
export type TListLoans = Array<ILoan>;
