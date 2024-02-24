import { LoanComponent } from "../LoanComponent";
import { LoansTable } from "../LoansTable";
import { SlideBarComponent } from "../SlideBarComponent";
import "./InputParent.css";

/**
 * This component represents the homepage of the website and displays all parts of the homepage.
 * @returns
 */
export const InputParent = () => {
  return (
    <div>
      <div>
        <LoanComponent />
      </div>
      <div className="Slider">
        <SlideBarComponent />
      </div>
      <div>
        <LoansTable />
      </div>
    </div>
  );
};
