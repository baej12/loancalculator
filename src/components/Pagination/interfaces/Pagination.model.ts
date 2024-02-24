/**
 * This is an interface that holds props for the pagination component.
 * This holds the number of payments, the index to start at, and a
 * function that updates the index.
 */
export interface IPaginationProps {
    arrayLength: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    index: number;
}