import { useEffect, useState } from "react";
import { IPaginationProps } from "./interfaces/Pagination.model";
import "./Pagination.css";

const PAGE_SIZE = 5;

/**
 * This Component represents the pagination for a table.
 * @param props
 * @returns
 */
export const Pagination = (props: IPaginationProps) => {
  const { arrayLength, setIndex, index } = props;

  // Represents the number of pages this table has
  let numOfPages = Math.ceil(arrayLength / PAGE_SIZE);

  // A state representing the pagination pattern that will be displayed to the user
  const [numbersShown, setNumbersShown] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "...",
    numOfPages.toString(),
  ]);

  /**
   * When the page mounts and the number of rows changes, this function calls updateNumbersShown
   * to update the pattern that should be shown to the user for the pagination.
   */
  useEffect(() => {
    let numOfPages = Math.ceil(arrayLength / PAGE_SIZE);
    updateNumbersShown(0);
  }, [arrayLength]);

  /**
   * This function updates the pagination pattern shown to the user depending on what
   * page of the table is being displayed.
   *
   * @param ind, a number representing the index of the rows in the table to be displayed
   */
  const updateNumbersShown = (ind: number) => {
    setIndex(ind);
    ind += 5;
    if (numOfPages < 6) {
      let tempArray = [];
      for (let i = 1; i <= numOfPages; i++) {
        tempArray.push(i.toString());
      }
      setNumbersShown(tempArray);
    } else if (ind / 5 < 6) {
      // Pattern if the current page of the table is 5 or less
      setNumbersShown(["1", "2", "3", "4", "5", "...", numOfPages.toString()]);
    } else if (ind / 5 > numOfPages - 5) {
      // Pattern if the current page of the table is near the end
      setNumbersShown([
        "1",
        "...",
        (numOfPages - 4).toString(),
        (numOfPages - 3).toString(),
        (numOfPages - 2).toString(),
        (numOfPages - 1).toString(),
        numOfPages.toString(),
      ]);
    } else {
      // Pattern if the current page of the table is in the middle
      setNumbersShown([
        "1",
        "...",
        (ind / 5 - 2).toString(),
        (ind / 5 - 1).toString(),
        (ind / 5).toString(),
        (ind / 5 + 1).toString(),
        (ind / 5 + 2).toString(),
        "...",
        numOfPages.toString(),
      ]);
    }
  };

  return (
    //shows the pagination pattern to the user
    <div>
      <button
        className="PageNumber"
        onClick={() => {
          if (index > 4) {
            updateNumbersShown(index - 5);
          }
        }}
      >
        {"<"}
      </button>

      {numbersShown.map((num, i) => {
        return (
          <button
            key={i}
            className={
              (+num - 1) * 5 === index
                ? "PageNumber PageNumber-selected"
                : "PageNumber"
            }
            onClick={() => {
              if (num !== "...") {
                updateNumbersShown((+num - 1) * 5);
              }
            }}
          >
            <span>{num}</span>
          </button>
        );
      })}
      <button
        className="PageNumber"
        onClick={() => {
          if (index < arrayLength - 5) {
            updateNumbersShown(index + 5);
          }
        }}
      >
        {">"}
      </button>
    </div>
  );
};
