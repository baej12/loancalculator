import "./Header.css";
import logo from "../../assests/NDLogo.svg";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { LoanContext } from "../CreateLoan";
import { PictureAPI } from "../PictureAPI/Index";
import { ILoanContext } from "../CreateLoan/interfaces/LoanContext.model";

/**
 * Component that renders header with appropriate logic
 * *  */
export const Header = () => {
  const loanContext = useContext<ILoanContext | null>(LoanContext);
  const location = useLocation();

  let navigate = useNavigate();
  return (
    <div className="header">
      {/* Logo */}
      <div>
        <img src={logo} />
      </div>
      {/* Links */}
      <div className="HeaderLinks">
        <div
          className={location.pathname === "/" ? "Page-selected link" : "link"}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </div>
        <div
          className={
            location.pathname === "/snowball" ? "Page-selected link" : "link"
          }
          onClick={() => {
            if (loanContext?.listLoans?.length) {
              navigate("/snowball");
            }
          }}
        >
          Snowball
        </div>
        <div
          className={
            location.pathname === "/avalanche" ? "Page-selected link" : "link"
          }
          onClick={() => {
            if (loanContext?.listLoans?.length) {
              navigate("/avalanche");
            }
          }}
        >
          Avalanche
        </div>
      </div>
      {/* person */}
      <div className="person">
        <PictureAPI />
      </div>
    </div>
  );
};
