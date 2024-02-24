import { useEffect, useState } from "react";
import { PaydownTableRow } from "../PaydownTableRow";
import { TableWrapper } from "../TableWrapper";
import { IPaydownTableProps } from "./interface/Paydown.Table.model";

/**
 * This component is the Paydown Table.
 * @param props
 * @returns
 */
export const PaydownTable = (props: IPaydownTableProps) => {
  const { paymentSchedule } = props;
  // The labels for the input table
  const labels = [
    "Month",
    "Principal Paid",
    "Interest Paid",
    "P/I Ratio",
    "Amount Paid",
  ];
  //a list that holds the rows for the table
  const [listOfRows, setListOfRows] = useState<Array<JSX.Element>>([]);

  /**
   * This function goes through the payment schedule, creates rows for each month, and then
   * adds them to the listOfRows
   */
  useEffect(() => {
    let tempArray = [];
    for (let i = 0; i < paymentSchedule.length; i++) {
      tempArray.push(<PaydownTableRow monthlyBreakdown={paymentSchedule[i]} />); //Just pull from Brandon and should have the info
    }
    setListOfRows(tempArray);
  }, [paymentSchedule]);

  return (
    <div>
      <TableWrapper
        title={"Paydown"}
        columnHeaders={labels}
        rows={listOfRows}
        isUsingPages={true}
      />
    </div>
  );
};
