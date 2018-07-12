// Core
import React, { Component, Fragment } from "react";
// Plugin / Library / Package
import { Icon } from "semantic-ui-react";
// Components / Utilities
import LoanButton from "./LoanButton";
import LoanForm from "./LoanForm";
import ProductSalesPitchModal from "../modals/ProductRecommendation/ProductSalesPitchModal";
import { storeProductRecommendation } from "../../service/ProductRecommendation";
import Constants from "../../constants/Common";
import ProductRecommendationConstants from "../../constants/ProductRecommendation";

class MortgageLoan extends Component {
  state = {
    data: null,
    showMortgageLoanForm: this.props.inPromotionList,
    loading: false
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
      console.log(productName, response);
      this.setState(
        response.status === Constants.SUCCESS_STATUS &&
        response.data.code === Constants.SUCCESS_CODE
          ? { data: Constants.SUCCESS_CODE }
          : { data: Constants.ERROR_CODE }
      );
    });

    this.setState({ loading: false });
  };

  toggleMortgageLoanForm = () => {
    this.setState(prevState => {
      return { showMortgageLoanForm: !prevState.showMortgageLoanForm };
    });
  };

  render() {
    let { showMortgageLoanForm, data, loading } = this.state;
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
                icon="home"
                text={ProductRecommendationConstants.HLOAN_LABEL}
                bg={bg}
              />
            }
            pitchClassify={ProductRecommendationConstants.HLOAN}
            modalHeader={ProductRecommendationConstants.HLOAN_LABEL}
          />

          {!inPromotionList && (
            <Icon
              name="angle double down"
              flipped={showMortgageLoanForm ? "vertically" : null}
              size="large"
              style={{
                color: "#11A847",
                fontWeight: "bold",
                cursor: "pointer"
              }}
              onClick={this.toggleMortgageLoanForm}
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

        {showMortgageLoanForm && (
          <LoanForm
            loading={loading}
            handleSubmit={this.handleSubmit}
            data={data}
          />
        )}
      </Fragment>
    );
  }
}

export default MortgageLoan;
