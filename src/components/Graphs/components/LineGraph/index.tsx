import { ChartData } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import "../../Graphs.css";
import { ILineGraphProps } from "./interfaces/LineGraph.model";
import { createGradient } from "../../../../utils/createGradient";
import { parseAmount } from "../../../../utils/numberRest";

/**
 *
 * This component displays a line graph with a total value on top along with a title
 *
 * @param props takes in a `ILineGraphProps` which contains all the data to be displayed
 * on the graph and what color to display it in
 * @returns Line graph component
 */
export const LineGraph = (props: ILineGraphProps) => {
  //extract all props
  const { title, color, displayAmount, monthlyData, options } = props;
  //get reference to graph to style it
  const graphRef = useRef<any>(null);
  //state that holds all the data for the graph
  const [graphData, setGraphData] = useState<ChartData<"line">>({
    //create object that holds graph data and passes it to the Line component
    labels: monthlyData.map(() => ""),
    datasets: [
      {
        fill: true,
        label: "",
        data: monthlyData,
        borderColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
        backgroundColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`,
      },
    ],
  });

  //updates styling of the graph
  useEffect(() => {
    const currGraph = graphRef.current;
    if (!currGraph) return;
    const newChartData = graphData;
    //update background color of chart to a gradient
    newChartData.datasets[0].backgroundColor = createGradient(
      currGraph.ctx,
      currGraph.chartArea,
      `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`
    );

    setGraphData(newChartData);
  }, []);

  return (
    <div className="Graph">
      <div className="GraphTitle">
        <p>{title}</p>
      </div>
      <div className="GraphAmount">
        <div className="dollarSign">
          <p>$</p>
        </div>
        <div className="GraphNumber">
          <p>{parseAmount(displayAmount)}</p>
        </div>
      </div>
      <div className="test">
        <Line
          style={{ height: "100%", width: "100%" }}
          ref={graphRef}
          options={options}
          data={graphData}
        />
      </div>
    </div>
  );
};
