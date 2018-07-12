// Core
import React, { Component } from "react";
// Components / Utilities
import LoanButton from "./LoanButton";
import ReferralOptions from "./ReferralOptions";
import ProductSalesPitchModal from "../modals/ProductRecommendation/ProductSalesPitchModal";
import { storeProductRecommendation } from "../../service/ProductRecommendation";
import Constants from "../../constants/Common";
import ProductRecommendationConstants from "../../constants/ProductRecommendation";

class CpinBlock extends Component {
  state = {
    data: null,
    loading: false,
    selectedRefResult: null
  };

  handleRefResultClick = option => {
    this.setState({ selectedRefResult: option, loading: true });

    const refResult =
      option === "interested"
        ? ProductRecommendationConstants.INTERESTED
        : option === "noNeed"
          ? ProductRecommendationConstants.NO_NEED
          : ProductRecommendationConstants.NOT_SUITABLE;

    storeProductRecommendation(
      ProductRecommendationConstants.CPIN_LABEL,
      refResult,
      "Y"
    ).then(response => {
      console.log(ProductRecommendationConstants.CPIN_LABEL, response);
      this.setState(
        response.status === Constants.SUCCESS_STATUS &&
        response.data.code === Constants.SUCCESS_CODE
          ? { data: Constants.SUCCESS_CODE, loading: false }
          : { data: Constants.ERROR_CODE, loading: false }
      );
    });
  };

  render() {
    const { data, selectedRefResult, loading } = this.state;

    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "18px 0 18px 0"
          }}
        >
          <ProductSalesPitchModal
            trigger={
              <LoanButton
                text={ProductRecommendationConstants.CPIN_LABEL}
                bg="#FFFAA2"
              />
            }
            pitchClassify={ProductRecommendationConstants.CPIN}
            modalHeader={ProductRecommendationConstants.CPIN_LABEL}
          />
          <ReferralOptions
            loading={loading}
            selectedRefResult={selectedRefResult}
            handleRefResultClick={this.handleRefResultClick}
          />
        </div>

        {!!data && (
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              margin: "-15px 24px 0 0",
              fontWeight: "bold"
            }}
            className="textGrey"
          >
            {data === Constants.SUCCESS_CODE ? "已送出" : "未傳送"}
          </div>
        )}
      </div>
    );
  }
}

export default CpinBlock;
