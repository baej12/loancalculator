import { IMonthlyBreakdown } from "../../interfaces/payments.model";

type TPaymentSchedule = Array<IMonthlyBreakdown>;

/**
 * This interface holds a list of all the loan payments for every month.
 */
export interface IPaydownTableProps {
  paymentSchedule: TPaymentSchedule;
}
