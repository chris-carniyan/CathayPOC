// Core
import React, { Component } from "react";
// Components
import Dashboard from "./Dashboard";
import Header from "./Header";
import RestrictedAccessPage from "./RestrictedAccess";
// CSS
import classes from "../assets/css/App.css";
// Utilities
import { validateToken } from "../service/Token";
import Constants from "../constants/Common";

class App extends Component {
  state = {
    isCorporateCustomer: false,
    timeout: false,
    tokenExpired: false
  };

  checkInterval = null;

  handleRestrictionPage = isCorporateCustomer => {
    this.setState({ isCorporateCustomer: isCorporateCustomer });
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ timeout: true });
    }, window.env.TIMEOUT_LENGTH);

    validateToken().then(response => {
      response.status === Constants.SUCCESS_STATUS &&
        response.data.code === window.env.TOKEN_EXPIRED_CODE &&
        this.setState({ tokenExpired: true });
    });

    if (window.env.VALIDATE_TOKEN_INTERVAL !== -1) {
      this.checkInterval = setInterval(async () => {
        await validateToken().then(response => {
          response.status === Constants.SUCCESS_STATUS &&
            response.data.code === window.env.TOKEN_EXPIRED_CODE &&
            this.setState({ tokenExpired: true });
        });
      }, window.env.VALIDATE_TOKEN_INTERVAL);
    }
  }

  getSnapshotBeforeUpdate() {
    const { isCorporateCustomer, timeout, tokenExpired } = this.state;

    if (window.env.VALIDATE_TOKEN_INTERVAL !== -1)
      (isCorporateCustomer || timeout || tokenExpired) &&
        clearInterval(this.checkInterval);

    return null;
  }

  componentDidUpdate(prevProps, prevState) {}

  displayRestrictedPage = message => (
    <div>
      <RestrictedAccessPage message={message} />
    </div>
  );

  displayDashboard = () => (
    <div className={classes.app}>
      <Header />
      <Dashboard handleRestrictionApp={this.handleRestrictionPage} />
    </div>
  );

  render() {
    const { isCorporateCustomer, timeout, tokenExpired } = this.state;

    return isCorporateCustomer
      ? this.displayRestrictedPage(window.env.CORPORATE_ACCOUNT_MESSAGE)
      : timeout
        ? this.displayRestrictedPage(window.env.SESSION_TIMEOUT_MESSAGE)
        : tokenExpired
          ? this.displayRestrictedPage(window.env.TOKEN_EXPIRED_MESSAGE)
          : this.displayDashboard();
  }
}

export default App;
