// Core
import React, { Fragment } from "react";
// Plugin / Library
import { Icon } from "semantic-ui-react";
// CSS
import classes from "../../assets/css/ProductRecommendation.css";

const referralOptions = ({
  selectedRefResult,
  handleRefResultClick,
  loading
}) => {
  return (
    <Fragment>
      <div className={classes.referralOptions} style={{ marginLeft: "10px" }}>
        <Icon
          circular
          name={
            selectedRefResult === "interested" && loading ? "spinner" : "check"
          }
          loading={selectedRefResult === "interested" && loading}
          className={[classes.referralOption, classes.interested].join(" ")}
          onClick={!loading ? () => handleRefResultClick("interested") : null}
          style={
            selectedRefResult === "interested"
              ? { color: "#ffffff", backgroundColor: "#11a847" }
              : null
          }
        />

        <Icon
          circular
          name={
            selectedRefResult === "noNeed" && loading ? "spinner" : "remove"
          }
          loading={selectedRefResult === "noNeed" && loading}
          className={[classes.referralOption, classes.noNeed].join(" ")}
          onClick={!loading ? () => handleRefResultClick("noNeed") : null}
          style={
            selectedRefResult === "noNeed"
              ? { color: "#ffffff", backgroundColor: "#ef2c2c" }
              : null
          }
        />

        <Icon
          circular
          name={
            selectedRefResult === "notSuitable" && loading ? "spinner" : "ban"
          }
          loading={selectedRefResult === "notSuitable" && loading}
          className={[classes.referralOption, classes.notSuitable].join(" ")}
          onClick={!loading ? () => handleRefResultClick("notSuitable") : null}
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
