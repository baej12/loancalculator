import { ChartOptions } from "chart.js";

/**
 * Props object for the line graph component
 * > **title** :title of graph
 * 
 * > **displayAmount** :total amount to display above graph
 * 
 * > **options** :options object for the line graph
 * 
 * > **color** :color for the line graph given as a array of 3 numbers (RGB)
 * 
 * > **monthlyData** : Array of numbers to be displayed on the graph
 */
export interface ILineGraphProps {
    title: string;
    displayAmount: number;
    options : ChartOptions<"line">;
    color: Array<number> ;
    monthlyData: Array<number>;
}