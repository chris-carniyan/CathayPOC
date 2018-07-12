// Core
import React, { Component, Fragment } from "react";
// Plugin / Library
import { Icon } from "semantic-ui-react";
// Components / Utilities
import LoanButton from "./LoanButton";
import LoanForm from "./LoanForm";
import { storeProductRecommendation } from "../../service/ProductRecommendation";
import ProductSalesPitchModal from "../modals/ProductRecommendation/ProductSalesPitchModal";
import Constants from "../../constants/Common";
import ProductRecommendationConstants from "../../constants/ProductRecommendation";

class PersonalLoan extends Component {
  state = {
    data: null,
    loading: false,
    showLoanForm: this.props.inPromotionList
  };

  toggleLoanForm = () => {
    this.setState(prevState => {
      return { showLoanForm: !prevState.showLoanForm };
    });
  };

  handleSubmit = async (
    selectedRefResult,
    selectedRefMethod = null,
    refSource = null,
    obEmployeeNo = null,
    obEmployeeLastName = null
  ) => {
    this.setState({ loading: true });

    const { productName, inPromotionList } = this.props;
    const customerTag = inPromotionList ? "Y" : "N";

    const refResult =
      selectedRefResult === "interested"
        ? ProductRecommendationConstants.INTERESTED
        : selectedRefResult === "noNeed"
          ? ProductRecommendationConstants.NO_NEED
          : ProductRecommendationConstants.NOT_SUITABLE;

    let refMethod = null;
    if (selectedRefMethod) {
      refMethod =
        selectedRefMethod === "issueAList"
          ? ProductRecommendationConstants.ISSUE_A_LIST
          : ProductRecommendationConstants.ONLINE_REFERRAL;
    }

    await storeProductRecommendation(
      productName,
      refResult,
      customerTag,
      refMethod,
      refSource,
      obEmployeeNo,
      obEmployeeLastName
    ).then(response => {
      this.setState(
        response.status === Constants.SUCCESS_STATUS &&
        response.data.code === Constants.SUCCESS_CODE
          ? { data: Constants.SUCCESS_CODE }
          : { data: Constants.ERROR_CODE }
      );
    });

    this.setState({ loading: false });
  };

  render() {
    let { data, loading, showLoanForm } = this.state;
    let { bg, inPromotionList } = this.props;

    return (
      <Fragment>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "18px 26px 18px 0"
          }}
        >
          <ProductSalesPitchModal
            trigger={
              <LoanButton
                icon="money"
                text={ProductRecommendationConstants.PLOAN_LABEL}
                bg={bg}
              />
            }
            pitchClassify={ProductRecommendationConstants.PLOAN}
            modalHeader={ProductRecommendationConstants.PLOAN_LABEL}
          />

          {!inPromotionList && (
            <Icon
              name="angle double down"
              flipped={showLoanForm ? "vertically" : null}
              size="large"
              style={{
                color: "#11A847",
                fontWeight: "bold",
                cursor: "pointer"
              }}
              onClick={this.toggleLoanForm}
            />
          )}

          {!!data && (
            <span
              style={{ marginLeft: "auto", fontWeight: "bold" }}
              className="textGrey"
            >
              {data === Constants.SUCCESS_CODE ? "已送出" : "未傳送"}
            </span>
          )}
        </div>

        {showLoanForm && (
          <LoanForm
            data={data}
            loading={loading}
            handleSubmit={this.handleSubmit}
          />
        )}
      </Fragment>
    );
  }
}

export default PersonalLoan;
