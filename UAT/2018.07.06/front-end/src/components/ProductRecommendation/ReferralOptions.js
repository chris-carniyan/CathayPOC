// Core
import React, { Fragment } from "react";
// Plugin / Library
import { Icon } from "semantic-ui-react";
// CSS
import classes from "../../assets/css/ProductRecommendation.css";

const referralOptions = ({ selectedRefResult, handleRefResultClick }) => {
  return (
    <Fragment>
      <div className={classes.referralOptions} style={{ marginLeft: "10px" }}>
        <Icon
          circular
          name={selectedRefResult !== "interested" ? "check" : "spinner"}
          loading={selectedRefResult === "interested"}
          className={[classes.referralOption, classes.interested].join(" ")}
          onClick={
            !selectedRefResult ? () => handleRefResultClick("interested") : null
          }
          style={
            selectedRefResult === "interested"
              ? { color: "#ffffff", backgroundColor: "#11a847" }
              : null
          }
        />

        <Icon
          circular
          name={selectedRefResult !== "noNeed" ? "remove" : "spinner"}
          loading={selectedRefResult === "noNeed"}
          className={[classes.referralOption, classes.noNeed].join(" ")}
          onClick={
            !selectedRefResult ? () => handleRefResultClick("noNeed") : null
          }
          style={
            selectedRefResult === "noNeed"
              ? { color: "#ffffff", backgroundColor: "#ef2c2c" }
              : null
          }
        />

        <Icon
          circular
          name={selectedRefResult !== "notSuitable" ? "ban" : "spinner"}
          loading={selectedRefResult === "notSuitable"}
          className={[classes.referralOption, classes.notSuitable].join(" ")}
          onClick={
            !selectedRefResult
              ? () => handleRefResultClick("notSuitable")
              : null
          }
          style={
            selectedRefResult === "notSuitable"
              ? { color: "#ffffff", backgroundColor: "#1a82dc" }
              : null
          }
        />
      </div>
    </Fragment>
  );
};

export default referralOptions;
