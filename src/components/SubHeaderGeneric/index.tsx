import { useNavigate } from "react-router-dom";
import { ISubHeaderProps } from "./interface";
import "./index.css";

/**
 * Generic sub-header component that provides a back to inputs button
 * @param props param to pass in such as title and description
 */
export const SubHeaderGeneric = (props: ISubHeaderProps) => {
  const { title, description } = props;
  const navigate = useNavigate();

  /**
   * Function to retrun the user back to the page when
   * they click on the "Back to input" button
   */
  const backToInputs = () => {
    navigate("/");
  };

  return (
    <div className="Generic-SubHeader">
      <div className="infoBox">
        <div
          className="back-to-input"
          onClick={() => {
            backToInputs();
          }}
        >
          &#10094; Back To Inputs
        </div>
        <div className="title">{title}</div>
        <div className="desc">{description}</div>
      </div>
    </div>
  );
};
