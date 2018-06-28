import React, { Component } from "react";
import { Segment, Button, Header, Dimmer, Loader } from "semantic-ui-react";
import { getReminder } from "../service/Reminder";
import AutoAccountDebitingFailureModal from "../components/modals/Reminders/AutoAccountDebitingFailureModal";
import PointsExpirationModal from "../components/modals/Reminders/PointsExpirationModal";
import NewCreditCardCustomerWelcomeGiftModal from "../components/modals/Reminders/NewCreditCardCustomerWelcomeGiftModal";
import RecommendationModal from "../components/modals/Reminders/RecommendationModal";
import classes from "../assets/css/Reminder.css";
import Constants from "../constants/Common";

class Reminder extends Component {
  state = {
    data: null,
    loading: true
  };

  handleRetry = async (retry = false) => {
    if (retry) {
      this.setState({ loading: true });
    }

    await getReminder().then(response => {
      console.log("RMDB response", response);

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

  displayAutoAccountDebitingFailure() {
    let content = null;
    let autoPayFailCnt = this.state.data.autoPayFailCnt;
    let autoPayRmbFailCnt = this.state.data.autoPayRmbFailCnt;
    let autoPayUsaFailCnt = this.state.data.autoPayUsaFailCnt;

    if (autoPayFailCnt > 0 || autoPayRmbFailCnt > 0 || autoPayUsaFailCnt > 0) {
      content = (
        <AutoAccountDebitingFailureModal autoPayFailCnt={autoPayFailCnt} />
      );
    }
    return content;
  }

  displayPointsExpiration() {
    let content = null;
    let y1AsianExpireMiles = this.state.data.y1AsianExpireMiles;
    let clearedCostcoBonusBal = this.state.data.clearedCostcoBonusBal;
    let platinumNextMonExpirePs = this.state.data.platinumNextMonExpirePs;
    let generalNextMonExpirePs = this.state.data.generalNextMonExpirePs;
    let y1EvaExpireMiles = this.state.data.y1EvaExpireMiles;

    if (
      y1AsianExpireMiles > 0 ||
      clearedCostcoBonusBal > 0 ||
      platinumNextMonExpirePs > 0 ||
      generalNextMonExpirePs > 0
    ) {
      content = (
        <PointsExpirationModal
          y1AsianExpireMiles={y1AsianExpireMiles}
          clearedCostcoBonusBal={clearedCostcoBonusBal}
          platinumNextMonExpirePs={platinumNextMonExpirePs}
          generalNextMonExpirePs={generalNextMonExpirePs}
          y1EvaExpireMiles={y1EvaExpireMiles}
        />
      );
    }
    return content;
  }

  displayNewCustomerWelcomeGift() {
    let content = null;
    let fflag = this.state.data.fflag;
    if (fflag === "Y") {
      content = <NewCreditCardCustomerWelcomeGiftModal />;
    }
    return content;
  }

  displayPromotionCampaign() {
    let content = null;
    let anyActivities = this.state.data.anyActivities;
    if (anyActivities) {
      content = <RecommendationModal />;
    }
    return content;
  }

  displayNoData() {
    return <div className={classes.noDataStyle}>無資料</div>;
  }

  render() {
    const { loading, data } = this.state;
    let content = null;
    let showNoData = false;

    if (!!data) {
      showNoData = [
        this.displayAutoAccountDebitingFailure(),
        this.displayPointsExpiration(),
        this.displayNewCustomerWelcomeGift(),
        this.displayPromotionCampaign()
      ].every(item => item == null);
      content = showNoData ? (
        <div className={classes.buttonsContainer}>{this.displayNoData()}</div>
      ) : (
        <div className={classes.buttonsContainer}>
          {this.displayAutoAccountDebitingFailure()}
          {this.displayPointsExpiration()}
          {this.displayNewCustomerWelcomeGift()}
          {this.displayPromotionCampaign()}
        </div>
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
            disabled={loading}
            content={Constants.RETRY}
            size="large"
          />
        </div>
      ) : null;
    }

    return (
      <Segment className="segment reminderContainerHeight">
        {loading ? (
          <Dimmer active>
            <Loader content="Loading" />
          </Dimmer>
        ) : null}
        <div className="segmentHeader">貼心提醒</div>
        <div>{content}</div>
        {!loading &&
          !!data &&
          !showNoData && (
            <div className={classes.bottomTextStyle}>
              長榮哩程到期提醒～施工中！
            </div>
          )}
      </Segment>
    );
  }
}
export default Reminder;
