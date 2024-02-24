import { useContext, useEffect, useState } from "react";
import { ILoan } from "../../interfaces/Loan.model";
import { LoanContext } from "../CreateLoan";
import { Graphs } from "../Graphs";
import {
  ILoansBreakdown,
  IMonthlyBreakdown,
  IPaymentBreakdown,
} from "../interfaces/payments.model";
import { PaydownTable } from "../PaydownTable";
import { SubHeaderGeneric } from "../SubHeaderGeneric";
import "./index.css";

/**
 * Will simulate paying down your loans using the Snowball method. Displays a header...
 * with general information about what the page will do. Also shows graphs describing different...
 * aspects about your loan payments. In addition, shows a paydown table that gives details about...
 * each loan as the months pass
 * @returns Snowball header, Graphs, and a PaydownTable
 */
export const AvalancheParentComponent = () => {
  //Used to get listLoans as well as payment schedule information
  const context = useContext(LoanContext);
  //Will be passed into PaydownTable and Graphs (stores information about payment and loans)
  const [arrMBD, setArrMBD] = useState<Array<IMonthlyBreakdown>>([]);

  //Holds the months in an array
  const calendar: Array<string> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //Gets current month index
  const month = new Date().getMonth();
  //Logs years as they pass
  let yearsGoneBy: number = 0;

  /**
   * Everytime there is a change to listLoans, and this component is loaded, then...
   * it will be sure to create a new updated array of IMonthlyBreakdown
   */
  useEffect(() => {
    let tempMBD: Array<IMonthlyBreakdown> = [];
    let tempLoanList: Array<ILoan> = context?.listLoans
      ? JSON.parse(JSON.stringify(context?.listLoans))
      : [];

    //Sorts array (smallest principal -> biggest principal)
    tempLoanList
      .sort((objA: ILoan, objB: ILoan) => {
        return objA.interest - objB.interest;
      })
      .reverse();
    //This for loop will keep looping so long as tempLoanList has non-zero principal loans
    //in it... OR if the payment schedule hits a hundred years
    for (
      let i = 0, monthIndex = 0;
      i < tempLoanList.length && tempLoanList.length > 0;
      i++, monthIndex++
    ) {
      //Gets the next month everytime the for loop loops
      let monthToDisplay: string = calendar[month + monthIndex];
      //Makes sure that monthIndex resets to Jan after December
      if (monthIndex + month + 1 >= 12) {
        yearsGoneBy++;
        monthIndex = -month - 1;
      }
      //Gets information about the payment of each loan
      let loansBreakdown = getOneMonthBreakdown(tempLoanList);
      //Summarizes / sums all the information about the payment of each loan
      let paymentBreakdown = getPaymentBreakdown(loansBreakdown[1]);
      tempLoanList = loansBreakdown[0];

      //Removes any zero principals from tempLoanList
      for (let n = 0; n < tempLoanList.length; n++) {
        let currentLoan = tempLoanList[n];
        if (currentLoan.principal <= 0) {
          tempLoanList.splice(n, 1);
          n--;
        }
      }

      //Pushes all the newly acquired information into tempMBD
      tempMBD.push({
        month: monthToDisplay,
        loansBreakdown: loansBreakdown[1],
        monthBreakdown: paymentBreakdown,
      });

      //Restarts the loop at 0 if we got to the end, but there are still loans inside the array
      if (i + 1 >= tempLoanList.length && tempLoanList.length !== 0) {
        i = -1;
      }

      //If payment schedule is a 100, break
      if (yearsGoneBy === 100) break;
    }
    setArrMBD(tempMBD);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context?.listLoans]);

  /**
   * Sums up all the minimum payments for each loan in the array, then returns that
   * @param currentLoanList The array of ILoans that you want to find the minimum required payments for
   * @returns The sum of the array's minimum required payments
   */
  const calcMinMonthlyPay = (currentLoanList: Array<ILoan>): number => {
    let minMonthlyPayment: number = 0;
    for (let i = 0; i < currentLoanList.length; i++) {
      minMonthlyPayment += currentLoanList[i].minPayment;
    }
    return minMonthlyPayment;
  };

  /**
   * Goes through the entire monthsLoanBreakdown, sums up all the different categories, and
   * ... and returns it an IPaymentBreakdown of all the summed up categories
   */
  const getPaymentBreakdown = (
    monthsLoanBreakdown: Array<ILoansBreakdown>
  ): IPaymentBreakdown => {
    let amountPaid: number = 0;
    let interestPaid: number = 0;
    let piRatio: number = 0;
    let principalPaid: number = 0;
    monthsLoanBreakdown.forEach((element) => {
      amountPaid += element.amountPaid;
      interestPaid += element.interestPaid;
      piRatio += element.piRatio / monthsLoanBreakdown.length;
      principalPaid += element.principalPaid;
    });

    let summaryOfTheMonth: IPaymentBreakdown = {
      amountPaid: amountPaid,
      interestPaid: interestPaid,
      piRatio: piRatio,
      principalPaid: principalPaid,
    };

    return summaryOfTheMonth;
  };

  /**
   * Applies the snowball method to the passed in Array of loans. It then parses all the information into an ILoanBreakdown array
   * @param currentLoanList Gets information about an array of loans and divvies it into an array of ILoansBreakdown
   * @returns The newly edited loan array of loans put under the snowball method AND an array of that loan array's ILoanBreakdown
   */
  const getOneMonthBreakdown = (
    currentLoanList: Array<ILoan>
  ): [Array<ILoan>, Array<ILoansBreakdown>] => {
    let tempLoanList: Array<ILoan> = currentLoanList;
    let userSpecifiedMonthlyPayment: number = 0;
    if (context && context.monthlyPayment && context.listLoans) {
      userSpecifiedMonthlyPayment = context.monthlyPayment;
    } else {
      userSpecifiedMonthlyPayment = calcMinMonthlyPay(currentLoanList);
    }
    let requiredMinMonthlyPayment: number = calcMinMonthlyPay(
      currentLoanList || []
    );
    let excessFromMonthlyPayment: number =
      userSpecifiedMonthlyPayment > requiredMinMonthlyPayment
        ? userSpecifiedMonthlyPayment - requiredMinMonthlyPayment
        : 0;
    let arrLBD: Array<ILoansBreakdown> = [];
    let interestPaid: Array<number> = [];
    let principalPaid: Array<number> = [];
    let piRatio: Array<number> = [];
    let loanNames: Array<string> = [];
    let amountPaid: Array<number> = [];

    tempLoanList.forEach((element, index) => {
      //Add the interest to the loan and subtract mimimum payment from it
      //...We will subtract excessPayment later
      //Get the required variables for an ILoansBreakdown
      loanNames.push(element.loanName);
      interestPaid.push((element.principal * element.interest) / 12); //Intrest=Principal*Rate(InterestRate)*Time(1/12)
      //If minPayment is higher than interestPaid, the we can pay off principal
      if (element.minPayment > interestPaid[index]) {
        //If the remaining payment after interest is greater than principal, we need to record it in a special way
        //We need to record that we paid off the entire loan and that we need to update excess payment to include
        //...how much the payment was over by
        if (element.minPayment - interestPaid[index] > element.principal) {
          principalPaid.push(element.principal);
          excessFromMonthlyPayment +=
            element.minPayment - element.principal - interestPaid[index];
          element.principal = 0;
          //If remianing payment is less than principal, then we record that, and update principal accordingly
        } else {
          principalPaid.push(element.minPayment - interestPaid[index]);
          element.principal -= principalPaid[index];
        }
        //Else, principal increases, and we record that we didn't pay off the principal
      } else {
        principalPaid.push(0);
        element.principal += interestPaid[index] - element.minPayment;
        interestPaid[index] = element.minPayment;
      }
      piRatio.push(principalPaid[index] / interestPaid[index]); //PIRatio=PrincipalPayment/Interest
      amountPaid.push(principalPaid[index] + interestPaid[index]);
    });

    //Distributes excess payment and stores amount paid to corresponding loan
    for (let i = 0; i < tempLoanList.length; i++) {
      if (tempLoanList[i].principal <= excessFromMonthlyPayment) {
        amountPaid[i] += tempLoanList[i].principal;
        excessFromMonthlyPayment -= tempLoanList[i].principal;
        principalPaid[i] += tempLoanList[i].principal;
        tempLoanList[i].principal = 0;
      } else {
        amountPaid[i] += excessFromMonthlyPayment;
        tempLoanList[i].principal -= excessFromMonthlyPayment;
        principalPaid[i] += excessFromMonthlyPayment;
        excessFromMonthlyPayment = 0;
        //break;
      }
      piRatio[i] = principalPaid[i] / interestPaid[i];
      if (excessFromMonthlyPayment === 0) break;
    }

    //Goes through all the laons, then makes an ILoansBreakdown from the names
    loanNames.forEach((element, index) => {
      arrLBD.push({
        loanName: element,
        principalPaid: principalPaid[index],
        interestPaid: interestPaid[index],
        piRatio: piRatio[index],
        amountPaid: amountPaid[index],
      });
    });

    return [tempLoanList, arrLBD];
  };
  //This shouldn't happen, but if the context is not present, then return an error page
  if (context === null || context.listLoans === null) {
    return <div>LoanContext is Null</div>;
  }

  return (
    <div className="avalanche-parent-div">
      <SubHeaderGeneric
        title="Avalanche"
        description="Pay down loans by the largest interest rate"
      />
      <div className="graphs-div">
        <Graphs monthlyData={arrMBD} key={arrMBD.length} />
      </div>
      <PaydownTable paymentSchedule={arrMBD} />
    </div>
  );
};
