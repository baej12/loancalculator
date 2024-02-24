import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
} from "chart.js";
import "./Graphs.css";
import { LineGraph } from "./components/LineGraph";
import { IGraphsData, IGraphsProps } from "./interfaces/Graphs.model";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

//options for all the graphs
export const options: ChartOptions<"line"> = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      display: false,
    },
    x: {
      display: false,
    },
  },
  elements: {
    line: {
      borderWidth: 1.5,
    },
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

/**
 * This component holds three graphs each depicting the change of total Interest, total paid,
 * and average interest over time
 *
 * @returns Graphs component
 */
export const Graphs = (props: IGraphsProps) => {
  const { monthlyData } = props;

  //state that holds all the data for the graphs
  const [graphsData, setGraphsData] = useState(() => {
    let data: IGraphsData = {
      totalInterestAmount: 0,
      totalPaidAmount: 0,
      averageInterest: 0,
      interestData: [],
      payData: [],
      averageData: [],
    };

    //populates out IGraphsData component
    monthlyData.forEach((month) => {
      data.totalInterestAmount += month.monthBreakdown.interestPaid;
      data.totalPaidAmount += month.monthBreakdown.amountPaid;

      let tmp: number = 0;
      month.loansBreakdown.forEach((payment) => {
        tmp += payment.interestPaid;
      });
      if (tmp) tmp /= month.loansBreakdown.length;
      data.averageInterest += tmp;

      data.interestData.push(month.monthBreakdown.interestPaid);
      data.payData.push(month.monthBreakdown.amountPaid);
      data.averageData.push(tmp);
    });

    data.averageInterest /= monthlyData.length;

    return data;
  });

  return (
    <div className="GraphsRow">
      <LineGraph
        title="Total Interest"
        displayAmount={graphsData.totalInterestAmount}
        options={options}
        color={[134, 56, 229]}
        monthlyData={graphsData.interestData}
      />
      <LineGraph
        title="Total Paid"
        displayAmount={graphsData.totalPaidAmount}
        options={options}
        color={[251, 145, 49]}
        monthlyData={graphsData.payData}
      />

      <LineGraph
        title="Average Interest"
        displayAmount={graphsData.averageInterest}
        options={options}
        color={[20, 174, 92]}
        monthlyData={graphsData.averageData}
      />
    </div>
  );
};
