import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { useState } from "react";
import { Pagination } from "../Pagination";
import { IGenericTableProps } from "./interfaces/TableWrapper.model";
import "./TableWrapper.css";

/**
 * This component represents a generic table that holds rows of JSX elements.
 *
 * @param props
 * @returns
 */
export const TableWrapper = (props: IGenericTableProps) => {
  //These are the props that are passed
  const { title, columnHeaders, rows, isUsingPages } = props;
  // Represents the index of the rows array to start on if isUsingPages is true
  const [index, setIndex] = useState(0);

  return (
    <div className="TableAndPage">
      <div className="GenericTable">
        {isUsingPages ? (
          <div>
            <div className="Table">
              <div className="TopHeader">
                <div className="TableTitle">
                  <h3>{title}</h3>
                </div>
                <div className="Length">{rows.length}</div>
              </div>

              <div className={"ColumnHeaders"}>
                {columnHeaders.map((header) => {
                  return (
                    <div
                      className={columnHeaders.length === 5 ? "Five" : "Four"}
                      key={header + keyboard.toString()}
                    >
                      {header}
                    </div>
                  );
                })}
                <div className={columnHeaders.length === 5 ? "Five" : "Four"}>
                  {" "}
                </div>
              </div>
              <div className="TableRows">
                {rows.slice(index, index + 5).map((row, i) => {
                  return (
                    <div
                      className={index + 4 === i ? "none" : "Rows"}
                      key={row.key + i.toString()}
                    >
                      {row}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="Pagination">
              <Pagination
                arrayLength={rows.length}
                index={index}
                setIndex={setIndex}
              />
            </div>
          </div>
        ) : (
          <div className="Table">
            <div className="TopHeader">
              <div className="TableTitle">
                <h3>{title}</h3>
              </div>
              <div className="Length">{rows.length}</div>
            </div>
            <div className="ColumnHeaders">
              {columnHeaders.map((header) => {
                return (
                  <div
                    className={columnHeaders.length === 5 ? "Five" : "Four"}
                    key={header + 5}
                  >
                    {header}
                  </div>
                );
              })}
              <div className={columnHeaders.length === 5 ? "Five" : "Four"}>
                {" "}
              </div>
            </div>
            <div className="TableRows">
              {rows.map((row, index) => {
                return <div key={row.key + index.toString()}>{row}</div>;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
