// Core
import React, { Component } from "react";
import { Container, Grid } from "semantic-ui-react";
// Components
import CustomerProfile from "../containers/CustomerProfile";
import CustomerJourney from "../containers/CustomerJourney";
import Prediction from "../containers/Prediction";
import FinancialInformation from "../containers/FinancialInformation";
import ProductRecommendation from "../containers/ProductRecommendation";
import Reminder from "../containers/Reminder";
import Helper from "../utility/Helper";

class Dashboard extends Component {
  state = {
    customerProfileInfo: false
  };

  handleRestrictionDashboard = isRestricted => {
    this.setState({ customerProfileInfo: isRestricted });
    this.props.handleRestrictionApp(isRestricted);
  };

  render() {
    return (
      <Container fluid>
        <div className="watermark">
          {Helper.getQueryParameters().header.employeeId}
        </div>
        <Grid>
          <Grid.Row>
            <Grid.Column stretched width={4}>
              <ProductRecommendation />
            </Grid.Column>

            <Grid.Column width={12} className="paddingLeft1">
              <Grid.Row className="paddingBottom15">
                <Grid columns={3}>
                  <Grid.Column stretched>
                    <CustomerProfile
                      handleRestriction={this.handleRestrictionDashboard}
                    />
                  </Grid.Column>

                  <Grid.Column className="paddingLeft1" stretched>
                    <Prediction />
                  </Grid.Column>

                  <Grid.Column className="paddingLeft1" stretched>
                    <Reminder />
                  </Grid.Column>
                </Grid>
              </Grid.Row>

              <Grid.Row className="paddingBottom15" stretched>
                <FinancialInformation />
              </Grid.Row>

              <Grid.Row stretched>
                <CustomerJourney />
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
export default Dashboard;
