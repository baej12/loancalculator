import { IMonthlyBreakdown } from "../../interfaces/payments.model";

/**
 * This interface carries monthlyBreakdown, which holds a single month's payment
 * information, including each loans' name, principal paid, interest paid, the
 * p/i ratio, and the amount paid.
 */
export interface IPaydownRowProps {
  monthlyBreakdown: IMonthlyBreakdown;
}
