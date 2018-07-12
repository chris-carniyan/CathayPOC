// Core
import React, { Component } from "react";
// Plugin / Library / Package
import { Button, Icon, Input, Select, Transition } from "semantic-ui-react";
// Components / Utilities
import ProductRecommendationConstants from "../../constants/ProductRecommendation";
// CSS
import classes from "../../assets/css/ProductRecommendation.css";

class LoanForm extends Component {
  state = {
    selectedRefResult: "",
    selectedRefMethod: "",
    selectedRefSource: ProductRecommendationConstants.REFERRAL,
    obEmployeeNo: "",
    obEmployeeLastName: ""
  };

  refSource = [
    {
      key: "referral",
      value: ProductRecommendationConstants.REFERRAL,
      text: ProductRecommendationConstants.REFERRAL
    },
    {
      key: "customerAsk",
      value: ProductRecommendationConstants.CUSTOMER_ASK,
      text: ProductRecommendationConstants.CUSTOMER_ASK
    }
  ];

  handleRefResultClick = option => {
    this.setState({ selectedRefResult: option });

    if (option !== "interested") {
      this.setState({ selectedRefMethod: "" });
    }
  };

  handleRefMethodOptionClick = option => {
    this.setState({ selectedRefMethod: option });
  };

  handleSelectRefSource = value => {
    this.setState({ selectedRefSource: value });
  };

  handleObEmployeeNoChange = event => {
    this.setState({ obEmployeeNo: event.target.value.replace(/\D/, "") });
  };

  handleObEmployeeLastNameChange = event => {
    this.setState({ obEmployeeLastName: event.target.value });
  };

  handleCancel = () => {
    this.setState({
      selectedRefResult: "",
      selectedRefMethod: "",
      selectedRefSource: ProductRecommendationConstants.REFERRAL,
      obEmployeeNo: "",
      obEmployeeLastName: ""
    });
  };

  handleCopy = () => {
    const { obEmployeeNo, obEmployeeLastName } = this.state;
    let text = `OB Employee No: ${obEmployeeNo}, OB Employee Last Name: ${obEmployeeLastName}`;
    let dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("value", text);
    dummy.setAttribute("id", "copy");
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  };

  render() {
    let {
      selectedRefResult,
      selectedRefMethod,
      selectedRefSource,
      obEmployeeNo,
      obEmployeeLastName
    } = this.state;
    let { loading, handleSubmit } = this.props;
    let actionButtons = null;
    let referralForm = null;

    if (selectedRefResult !== "") {
      if (selectedRefResult === "interested") {
        if (selectedRefMethod !== "") {
          actionButtons = (
            <div className={classes.actionButtonsWithSelect}>
              <Select
                options={this.refSource}
                className={classes.referralType}
                onChange={(e, { value }) => this.handleSelectRefSource(value)}
                defaultValue={selectedRefSource}
                style={{ flexGrow: 1 }}
              />

              <span
                onClick={
                  !loading
                    ? () =>
                        selectedRefMethod === "onlineReferral"
                          ? handleSubmit(
                              selectedRefResult,
                              selectedRefMethod,
                              selectedRefSource,
                              obEmployeeNo,
                              obEmployeeLastName
                            )
                          : handleSubmit(
                              selectedRefResult,
                              selectedRefMethod,
                              selectedRefSource
                            )
                    : null
                }
                className={classes.actionButton}
                style={{ color: "#ffffff", backgroundColor: "#11A847" }}
              >
                {!loading ? "提交" : <Icon loading name="spinner" />}
              </span>

              <span
                onClick={this.handleCancel}
                className={classes.actionButton}
                style={{ color: "#11A847", backgroundColor: "#ffffff" }}
              >
                取消
              </span>
            </div>
          );

          if (selectedRefMethod === "onlineReferral") {
            referralForm = (
              <div className={classes.referralForm}>
                <span className={classes.referralFormHeader}>直效員編:</span>
                <div className={classes.referralFormFields}>
                  <Input
                    placeholder="12345"
                    id="obEmployeeNo"
                    value={obEmployeeNo}
                    onChange={this.handleObEmployeeNoChange}
                    style={{ flexGrow: 1 }}
                  />
                  <Input
                    placeholder="x"
                    id="obEmployeeLastName"
                    value={obEmployeeLastName}
                    onChange={this.handleObEmployeeLastNameChange}
                    style={{ flexGrow: 1 }}
                  />
                  <span>專員</span>
                  <Button icon="copy" color="green" onClick={this.handleCopy} />
                </div>
              </div>
            );
          }
        }
      } else {
        actionButtons = (
          <div className={classes.actionButtons}>
            <span
              onClick={!loading ? () => handleSubmit(selectedRefResult) : null}
              className={classes.actionButton}
              style={{ color: "#ffffff", backgroundColor: "#11A847" }}
            >
              {!loading ? "提交" : <Icon loading name="spinner" />}
            </span>
            <span
              onClick={this.handleCancel}
              className={classes.actionButton}
              style={{ color: "#11A847", backgroundColor: "#ffffff" }}
            >
              取消
            </span>
          </div>
        );
      }
    }

    return (
      <div className={classes.loanForm}>
        <div className={classes.referralOptions}>
          <Icon
            circular
            name="check"
            className={[classes.referralOption, classes.interested].join(" ")}
            onClick={
              !loading ? () => this.handleRefResultClick("interested") : null
            }
            style={
              selectedRefResult === "interested"
                ? { color: "#ffffff", backgroundColor: "#11a847" }
                : null
            }
          />

          <Transition
            visible={selectedRefResult === "interested"}
            animation="fade"
            duration={150}
          >
            <div className={classes.interestedOptions}>
              <span className={classes.interestedOption}>
                <Icon
                  circular
                  size="tiny"
                  className={classes.icons}
                  onClick={() => this.handleRefMethodOptionClick("issueAList")}
                  style={
                    selectedRefMethod === "issueAList"
                      ? { backgroundColor: "#11a847" }
                      : null
                  }
                />
                開單
              </span>

              <span className={classes.interestedOption}>
                <Icon
                  circular
                  size="tiny"
                  className={classes.icons}
                  onClick={() =>
                    this.handleRefMethodOptionClick("onlineReferral")
                  }
                  style={
                    selectedRefMethod === "onlineReferral"
                      ? { backgroundColor: "#11a847" }
                      : null
                  }
                />
                線上轉介
              </span>
            </div>
          </Transition>

          <Icon
            circular
            name="remove"
            className={[classes.referralOption, classes.noNeed].join(" ")}
            onClick={
              !loading ? () => this.handleRefResultClick("noNeed") : null
            }
            style={
              selectedRefResult === "noNeed"
                ? { color: "#ffffff", backgroundColor: "#ef2c2c" }
                : null
            }
          />
          <Icon
            circular
            name="ban"
            className={[classes.referralOption, classes.notSuitable].join(" ")}
            onClick={
              !loading ? () => this.handleRefResultClick("notSuitable") : null
            }
            style={
              selectedRefResult === "notSuitable"
                ? { color: "#ffffff", backgroundColor: "#1a82dc" }
                : null
            }
          />
        </div>

        {referralForm}
        {actionButtons}
      </div>
    );
  }
}

export default LoanForm;
