/**
 * This interface represents a month and the loans that need to be paid in that month
 * with all of the loans' information.
 */
export interface IMonthlyBreakdown {
  month: string;
  loansBreakdown: Array<ILoansBreakdown>;
  monthBreakdown: IPaymentBreakdown;
}

/**
 * This interface represents a loans' information for how it is being paid off.
 */
export interface IPaymentBreakdown {
  principalPaid: number;
  interestPaid: number;
  piRatio: number;
  amountPaid: number;
}

/**
 * This adds loan name to the IPayment Breakdown
 */
export interface ILoansBreakdown extends IPaymentBreakdown {
  loanName: string;
}
