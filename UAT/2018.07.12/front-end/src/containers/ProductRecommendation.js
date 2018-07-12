// Core
import React, { Component, Fragment } from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
// Plugin / Library / Package
import { Button, Divider, Header } from "semantic-ui-react";
// Components / Utilities
import PersonalLoan from "../components/ProductRecommendation/PersonalLoan";
import MortgageLoan from "../components/ProductRecommendation/MortgageLoan";
import CashAdvanceInstallmentLoan from "../components/ProductRecommendation/CashAdvanceInstallmentLoan";
import PaymentInstallmentBlock from "../components/ProductRecommendation/PaymentInstallmentBlock";
import CpinBlock from "../components/ProductRecommendation/CpinBlock";
import CustomerDataUpdateBlock from "../components/ProductRecommendation/CustomerDataUpdateBlock";
import { getProductRecommendation } from "../service/ProductRecommendation";
import Constants from "../constants/Common";
import ProductRecommendationConstants from "../constants/ProductRecommendation";
// CSS
import classes from "../assets/css/ProductRecommendation.css";

class ProductRecommendation extends Component {
  state = {
    data: null,
    loading: true
  };

  handleRetry = async (retry = false) => {
    retry && this.setState({ loading: true });

    await getProductRecommendation().then(response => {
      console.log("ROPDB response", response);

      setTimeout(() => {
        response.status === Constants.SUCCESS_STATUS &&
        response.data.code === Constants.SUCCESS_CODE
          ? this.setState({ data: response.data.result, loading: false })
          : this.setState({ loading: false });
      }, retry ? Constants.RETRY_INTERVAL : 0);
    });
  };

  componentDidMount() {
    this.handleRetry();
  }

  render() {
    const { data, loading } = this.state;
    let content = null;

    if (!!data) {
      content = (
        <Fragment>
          {data.personalLoan === "Y" ? (
            <Fragment>
              <PersonalLoan
                productName={ProductRecommendationConstants.PLOAN_LABEL}
                bg="#FFFAA2"
                inPromotionList={true}
              />
              <Divider />
            </Fragment>
          ) : null}

          {data.paymentInstallment === "Y" ? (
            <Fragment>
              <PaymentInstallmentBlock memo={data.memo} />
              <Divider />
            </Fragment>
          ) : null}

          {data.mortgage === "Y" ? (
            <Fragment>
              <MortgageLoan
                bg="#FFFAA2"
                productName={ProductRecommendationConstants.HLOAN_LABEL}
                inPromotionList={true}
              />
              <Divider />
            </Fragment>
          ) : null}

          {data.canSuggestCPIN ? (
            <Fragment>
              <CpinBlock />
              <Divider />
            </Fragment>
          ) : null}

          {data.isContactInformationCorrect ? null : (
            <Fragment>
              <CustomerDataUpdateBlock />
              <Divider />
            </Fragment>
          )}

          {data.installmentLoansCashAdv === "Y" ? (
            <Fragment>
              <CashAdvanceInstallmentLoan />
              {data.mortgage !== "Y" || data.personalLoan !== "Y" ? (
                <Divider />
              ) : null}
            </Fragment>
          ) : null}

          {data.personalLoan !== "Y" ? (
            <Fragment>
              <PersonalLoan
                productName={ProductRecommendationConstants.PLOAN_LABEL}
                bg="#dfdfdf"
                inPromotionList={false}
              />
              <Divider />
            </Fragment>
          ) : null}

          {data.mortgage !== "Y" ? (
            <Fragment>
              <MortgageLoan
                bg="#dfdfdf"
                productName={ProductRecommendationConstants.HLOAN_LABEL}
                inPromotionList={true}
              />
            </Fragment>
          ) : null}
        </Fragment>
      );
    } else {
      content = !loading ? (
        <div className="btnRetryContainer">
          <Header
            as="h3"
            content={Constants.SERVICE_UNAVAILABLE}
            className="serviceUnavailable"
          />
          <Button
            onClick={() => this.handleRetry(true)}
            content={Constants.RETRY}
            size="large"
          />
        </div>
      ) : null;
    }

    return (
      <Segment className={classes.bg}>
        {loading ? (
          <Dimmer active>
            <Loader content="Loading" />
          </Dimmer>
        ) : null}
        <div className="segmentHeader">
          <span style={{ display: "flex" }}>
            <span>產品推介</span>
            <span style={{ marginLeft: "auto" }}>
              {!data ? null : data.lowMarketingInd !== "Y" ? null : (
                <img
                  src="/assets/images/low-marketing.png"
                  alt="Low Marketing"
                  height="36px"
                  width="36px"
                  style={{
                    margin: data.isHighlyResponsive
                      ? "-10px 10px 0 0"
                      : "-10px 23px 0 0"
                  }}
                />
              )}
              {!data ? null : !data.isHighlyResponsive ? null : (
                <img
                  src="/assets/images/highly-responsive.png"
                  alt="Is Higly Responsive"
                  height="36px"
                  width="36px"
                  style={{ margin: "-10px 23px 0 0" }}
                />
              )}
            </span>
          </span>
        </div>
        <div className={classes.segmentContent}>{content}</div>
      </Segment>
    );
  }
}
export default ProductRecommendation;
