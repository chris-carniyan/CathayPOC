// Core
import React from "react";
// Plugin / Library
import { Icon } from "semantic-ui-react";
// CSS
import classes from "../../assets/css/ProductRecommendation.css";

const loanButton = ({ bg, icon, text, border, radius }) => (
  <div
    className={classes.loanBtn}
    style={{ backgroundColor: bg, border: border, borderRadius: radius }}
  >
    {icon ? <Icon name={icon} className={classes.loanBtnIcon} /> : null}
    <span className={classes.loanBtnText}>{text}</span>
    <Icon className={classes.loanBtnArrow} size="small" name="chevron right" />
  </div>
);

export default loanButton;
