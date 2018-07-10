// Core
import React, { Component, Fragment } from "react";
// Library / Plugin
import {
  Button,
  Dimmer,
  Header,
  Loader,
  Segment,
  Grid,
  Popup
} from "semantic-ui-react";
// Components
import {
  customerProfileBirthMonths,
  CpConstants
} from "../constants/CustomerProfile";
import {
  getCustomerProfileOracle,
  getCustomerProfileMongo,
  greetCustomer
} from "../service/CustomerProfile";
import Constants from "../constants/Common";
import SignificantComplaintModal from "../components/modals/SignificantComplaintModal";
// CSS
import classes from "../assets/css/CustomerProfile.css";

class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oracleResult: null,
      mongoResult: null,
      loading: true
    };
  }

  handleRetry = async (retry = false) => {
    retry && this.setState({ loading: true });

    const [oracleResponse, mongoResponse] = await Promise.all([
      getCustomerProfileOracle(),
      getCustomerProfileMongo()
    ]);

    console.log("CPDB oracle response", oracleResponse);
    console.log("CPDB mongo response", mongoResponse);

    setTimeout(() => {
      if (
        oracleResponse.status === Constants.SUCCESS_STATUS &&
        oracleResponse.data.code === Constants.SUCCESS_CODE &&
        mongoResponse.status === Constants.SUCCESS_STATUS &&
        mongoResponse.data.code === Constants.SUCCESS_CODE
      ) {
        switch (oracleResponse.data.result.customerClassCode) {
          case CpConstants.CORPORATE_ACCOUNT:
            this.props.handleRestriction(true);
            break;
          case CpConstants.INDIVIDUAL_ACCOUNT:
            this.setState(
              {
                oracleResult: oracleResponse.data.result,
                mongoResult: mongoResponse.data.result,
                loading: false
              },
              () => {
                this.displayBirthMonth(mongoResponse.data.result.birthMonth);
              }
            );
            break;
          default:
            this.setState({ loading: false });
        }
      } else {
        this.setState({ loading: false });
      }
    }, retry ? Constants.RETRY_INTERVAL : 0);
  };

  componentDidMount() {
    this.handleRetry();
  }

  switchDisplaySpecialIdentity(specialIdentity) {
    switch (specialIdentity) {
      case "IS_AML_GOV_IND":
        return (
          <div className="bgYellow font16 bold text-center margin-bottom-10">
            <span className={classes.specialIdentity}>政府官員 </span>
            <img
              alt="warning"
              className="alignIcon"
              width={32}
              height={24}
              src="/assets/images/warning.png"
            />
          </div>
        );
      case "CUB_MANAGER_IND":
        return (
          <div className="bgYellow font16 bold text-center margin-bottom-10">
            <span className={classes.specialIdentity}>銀行高階長官 </span>
            <img
              alt="warning"
              className="alignIcon"
              width={32}
              height={24}
              src="/assets/images/warning.png"
            />
          </div>
        );
      case "CC_VIP_1_IND":
        return (
          <div className="bgYellow font16 bold text-center margin-bottom-10">
            <span className={classes.specialIdentity}>蔡家 </span>
            <span>
              <img
                alt="warning"
                className="alignIcon"
                width={32}
                height={24}
                src="/assets/images/warning.png"
              />
            </span>
          </div>
        );
      case "EMPLOYEE_IND":
        return (
          <div className="bgYellow font16 bold text-center margin-bottom-10">
            <span className={classes.specialIdentity}>行員 </span>
            <img
              alt="warning"
              className="alignIcon"
              width={32}
              height={24}
              src="/assets/images/warning.png"
            />
          </div>
        );
      default:
        return (
          <div className="bgYellow font16 bold text-center margin-bottom-10" />
        );
    }
  }

  displayComplaintCount(complaintCount) {
    if (complaintCount !== null && complaintCount > 0) {
      return <SignificantComplaintModal complaintCount={complaintCount} />;
    } else {
      return <div className="textRed padding-left-20" />;
    }
  }

  displayBankVip(bankVip) {
    switch (bankVip) {
      case "V":
        return <div className="bgYellow font16 text-center bold">黃金 VIP</div>;
      case "S":
        return (
          <div className="bgYellow font16 text-center bold">白金 SVIP</div>
        );
      case "H":
        return (
          <div className="bgYellow font16 text-center bold">鑽石 HVIP</div>
        );
      default:
        return null;
    }
  }

  renderSwitch(ccVipCode) {
    switch (ccVipCode) {
      case "1":
        return (
          <div
            className="bgYellow font11 bold margin-bottom-10"
            style={{ textAlign: "center" }}
          >
            1：頂級尊貴VIP持卡人
          </div>
        );
      case "2":
        return (
          <div
            className="bgYellow font11 bold margin-bottom-10"
            style={{ textAlign: "center" }}
          >
            2：往來客戶VIP持卡人
          </div>
        );
      case "3":
        return (
          <div
            className="bgYellow font15 bold margin-bottom-10"
            style={{ textAlign: "center" }}
          >
            3：世界卡持卡人
          </div>
        );
      case "4":
        return (
          <div
            className="bgYellow font16 bold margin-bottom-10"
            style={{ textAlign: "center" }}
          >
            4：小無限卡
          </div>
        );
      case "5":
        return (
          <div
            className="bgYellow font15 bold margin-bottom-10"
            style={{ textAlign: "center" }}
          >
            5：高消費持卡人
          </div>
        );
      case "6":
        return (
          <div
            className="bgYellow font11 bold margin-bottom-10"
            style={{ textAlign: "center" }}
          >
            6：COSTCO VIP客戶
          </div>
        );
      case "7":
        return (
          <div
            className="bgYellow font16 bold margin-bottom-10"
            style={{ textAlign: "center" }}
          >
            7：集團長官暨國泰金控相關企業商務卡
          </div>
        );
      case "8":
        return (
          <div
            className="bgYellow font11 bold margin-bottom-10"
            style={{ textAlign: "center" }}
          >
            8：高資產戶之持卡人
          </div>
        );
      case "9":
        return (
          <div
            className="bgYellow font10 bold margin-bottom-10"
            style={{ textAlign: "center" }}
          >
            9：世界卡、無限卡持卡人
          </div>
        );
      default:
        return null;
    }
  }

  renderName(customerName) {
    const customerNameLength = customerName.length;

    if (customerNameLength > 5) {
      const newCustomerName = customerName.substring(0, 5);
      const customerNameContainer = <span>{newCustomerName}</span>;
      const customerNamePopUp = (
        <Popup trigger={customerNameContainer}>
          <Popup.Header>{customerName}</Popup.Header>
        </Popup>
      );
      return customerNamePopUp;
    } else {
      return customerName;
    }
  }

  displayBirthMonth(birthMonthNumber) {
    const birthMonth = customerProfileBirthMonths[birthMonthNumber - 1];
    return birthMonth;
  }

  displayBirthDayIcon(birthMonthNumber, currentMonth, hasGreeted) {
    const { oracleResult, mongoResult } = this.state;
    if (birthMonthNumber === currentMonth) {
      if (hasGreeted) {
        return (
          <img
            alt="cake"
            className="alignIcon"
            width={28}
            height={28}
            src="/assets/images/cake.png"
          />
        );
      } else {
        return (
          <span>
            <img
              alt="cake"
              className={classes.birthDayIconEnabled}
              width={28}
              height={28}
              src="/assets/images/cake.png"
              onClick={() =>
                this.greetCustomer(
                  oracleResult.customerName,
                  oracleResult.ccVip,
                  mongoResult.bankVip
                )
              }
            />
          </span>
        );
      }
    }
  }

  greetCustomer(customerName, ccVipInd, bankVipInd) {
    if (!this.state.loading) {
      this.setState(
        {
          loading: true
        },
        () => {
          greetCustomer(customerName, ccVipInd, bankVipInd).then(response => {
            if (
              response.status === Constants.SUCCESS_STATUS &&
              response.data.code === Constants.SUCCESS_CODE
            ) {
              this.setState(prevState => {
                return {
                  loading: false,
                  oracleResult: {
                    ...prevState.oracleResult,
                    hasGreeted: !prevState.oracleResult.hasGreeted
                  }
                };
              });
            }
          });
        }
      );
    }
  }

  render() {
    const { oracleResult, mongoResult, loading } = this.state;

    let content = null;

    if (oracleResult !== null && mongoResult !== null) {
      content = (
        <Fragment>
          <div className="segmentHeader">
            <Grid columns={2} className="marginless paddingless">
              <Grid.Row className="marginless paddingless">
                <Grid.Column width={4} className="marginless paddingless">
                  基本樣貌
                </Grid.Column>
                <Grid.Column width={2} className="marginless paddingless" />
                <Grid.Column width={10} className="marginless paddingless">
                  {mongoResult.complaintCount !== undefined &&
                    this.displayComplaintCount(mongoResult.complaintCount)}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>

          <div className="contentDiv segmentContent profileHeight paddingTop15 paddingBottom15">
            <Grid columns={2} divided className="marginless paddingless">
              <Grid.Row className="marginless paddingless">
                <Grid.Column className="marginless paddingless">
                  <div className="profileContentHeight">
                    <div className={classes.customerProfileLeft}>
                      <div className={classes.customerName}>
                        {this.renderName(oracleResult.customerName)}
                      </div>

                      <div
                        className={classes.container}
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          marginTop: 10,
                          color: mongoResult.age < 20 ? "red" : "black"
                        }}
                      >
                        {mongoResult.age}歲
                      </div>

                      <div
                        className={classes.container}
                        style={{
                          color: "#787676"
                        }}
                      >
                        <div>
                          <span
                            style={{
                              position: "relative",
                              top:
                                mongoResult.birthMonth !==
                                mongoResult.currentMonth
                                  ? 5
                                  : 0
                            }}
                          >
                            {this.displayBirthMonth(
                              this.state.mongoResult.birthMonth
                            )}壽星
                          </span>
                          {this.displayBirthDayIcon(
                            mongoResult.birthMonth,
                            mongoResult.currentMonth,
                            oracleResult.hasGreeted
                          )}
                        </div>

                        {oracleResult.hasGreeted &&
                        mongoResult.birthMonth === mongoResult.currentMonth ? (
                          <div style={{ marginTop: 10 }}>已祝賀</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Grid.Column>

                <Grid.Column className="marginless paddingFormat">
                  <div className="profileContentHeight width140 marginAuto">
                    {this.switchDisplaySpecialIdentity(
                      oracleResult.specialIdentity
                    )}
                    <div className="bgYellow font16 bold">
                      {this.renderSwitch(oracleResult.ccVip)}
                    </div>
                    {this.displayBankVip(mongoResult.bankVip)}
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Fragment>
      );
    } else {
      content = !loading ? (
        <Fragment>
          <div className="segmentHeader">基本樣貌</div>
          <div className="segmentContent">
            <div className="btnRetryContainer">
              {!!mongoResult ? this.displayComplaintCount(2) : null}
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
          </div>
        </Fragment>
      ) : null;
    }

    return (
      <Segment className="segment customerProfileContainerHeight">
        {loading ? (
          <Dimmer active>
            <Loader content="Loading" />
          </Dimmer>
        ) : null}
        {content}
      </Segment>
    );
  }
}
export default CustomerProfile;
