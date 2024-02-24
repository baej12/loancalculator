/**
 * This interface holds props for the TableWrapper component. It has
 * the title of the table. the column headers, the rows that will be 
 * displayed in the table as components, and whether the table will 
 * have pages or not.
 */
export interface IGenericTableProps {
    title: string;
    columnHeaders: Array<string>;
    rows: Array<JSX.Element>; 
    isUsingPages: boolean;
}