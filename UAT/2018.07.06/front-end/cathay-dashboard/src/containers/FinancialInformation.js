import React, { Component } from "react";
import {
  Grid,
  Segment,
  Header,
  Button,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { getFinancialProducts } from "../service/FinancialInformation";
import Cards from "../components/FinancialProducts/Cards";
import PaymentHabits from "../components/FinancialProducts/PaymentHabits";
import OtherFinancialProducts from "../components/FinancialProducts/OtherFinancialProducts";
import Constants from "../constants/Common";
import classes from "../assets/css/FinancialInformation.css";

class FinancialInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true
    };
  }

  handleRetry = async (retry = false) => {
    if (retry) {
      this.setState({ loading: true });
    }

    await getFinancialProducts().then(response => {
      console.log("FPDB response", response);

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
    const { loading, data } = this.state;
    let content;

    if (!data) {
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
    } else {
      content = (
        <div style={{ height: "230px" }}>
          <br />
          <div className={classes.segmentTitle}>信用卡</div>
          <Grid columns={3}>
            <Grid.Column width={3} className={classes.financialProductsColumn}>
              <Cards result={data} />
            </Grid.Column>
            <Grid.Column width={7} className={classes.financialProductsColumn}>
              <PaymentHabits result={data} />
            </Grid.Column>
            <Grid.Column width={5} className={classes.financialProductsColumn}>
              <OtherFinancialProducts result={data} />
            </Grid.Column>
          </Grid>
        </div>
      );
    }
    return (
      <Segment className={classes.financialInformation}>
        {loading ? (
          <Dimmer active>
            <Loader content="Loading" />
          </Dimmer>
        ) : null}
        <div>
          <div className="segmentHeader">持有產品</div>
          {content}
        </div>
      </Segment>
    );
  }
}
export default FinancialInformation;
