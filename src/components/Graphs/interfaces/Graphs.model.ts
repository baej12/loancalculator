
import { IMonthlyBreakdown } from "../../interfaces/payments.model";

/**
 * Holds array of months which each contain the average data for that month
 * 
 *  > **monthlyData**     :    Array of `IMonthlyBreakdown` objects
 */
export interface IGraphsProps{
    monthlyData: Array<IMonthlyBreakdown>;
}

/**
 * Holds data for all the graphs in one object
 * 
 *  >> **totalInterestAmount**  total interests paid
 *  >> **totalPaidAmount** total paid amount
 *  >> **averageInterest** average interest paid
 *  >> **interestData** array of all the interests paid for each month
 *  >> **payData** array of amount paid for each month
 *  >> **averageData** average interest paid for each month
 * 
 */
export interface IGraphsData{

  totalInterestAmount: number;
  totalPaidAmount: number;
  averageInterest: number;
  interestData:Array<number>;
  payData:Array<number>;
  averageData: Array<number>;
  
}

