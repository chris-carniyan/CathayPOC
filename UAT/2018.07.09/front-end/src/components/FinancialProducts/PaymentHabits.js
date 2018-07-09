import React, { Component } from "react";
import { Button, Icon, Container } from "semantic-ui-react";
import PaymentHabitsModal from "../modals/FinancialProducts/PaymentHabitsModal";
import AutoAccountDebitingModal from "../modals/FinancialProducts/AutoAccountDebitingModal";
import UtilityBillsPaymentModal from "../modals/FinancialProducts/UtilityBillsPaymentModal";
import classes from "../../assets/css/FinancialInformation.css";

class PaymentHabits extends Component {
  render() {
    const paymentHabitsData = this.props.result;
    const {
      ccPubAutoDeductInd,
      ccStmtAutoDeductInd,
      l3TimesCcPayMethodDesc,
      l3TimesCcPayRateDesc
    } = paymentHabitsData;

    let autoAccountDebitingModalContent;
    let utilityBillsPaymentsModalContent;
    let content = null;

    //Auto Account Debiting
    if (ccStmtAutoDeductInd === "y" || ccStmtAutoDeductInd === "Y") {
      autoAccountDebitingModalContent = (
        <AutoAccountDebitingModal ccStmtAutoDeductInd={ccStmtAutoDeductInd} />
      );
    } else {
      autoAccountDebitingModalContent = (
        <Button className={classes.paymentListButton} basic color="grey">
          自動扣款
          <Icon
            className={classes.chevronRight}
            name="chevron right"
            basic="true"
            color="grey"
          />
        </Button>
      );
    }

    //Utility Bills Payments
    if (ccPubAutoDeductInd === "y" || ccPubAutoDeductInd === "Y") {
      utilityBillsPaymentsModalContent = (
        <UtilityBillsPaymentModal ccPubAutoDeductInd={ccPubAutoDeductInd} />
      );
    } else {
      utilityBillsPaymentsModalContent = (
        <Button className={classes.paymentListButton} basic color="grey">
          近半年公用事業/停車費交易
          <Icon
            className={classes.chevronRight}
            name="chevron right"
            basic="true"
            color="grey"
          />
        </Button>
      );
    }

    const paymentHabitsGrid = (
      <div className={classes.paymentDiv}>
        <PaymentHabitsModal queryParameter={this.props.queryParameter} />
        <ul className={classes.paymentList}>
          <li>
            近3次通路:
            <span style={{ marginLeft: "14px" }}>{l3TimesCcPayMethodDesc}</span>
          </li>
          <li>
            近三月比例: <span>{l3TimesCcPayRateDesc}</span>
          </li>
        </ul>
        <Container className={classes.paymentListButtonContainer}>
          {autoAccountDebitingModalContent}
          {utilityBillsPaymentsModalContent}
        </Container>
      </div>
    );

    if (
      paymentHabitsData !== undefined ||
      paymentHabitsData !== null ||
      paymentHabitsData.length !== 0
    ) {
      content = <div>{paymentHabitsGrid}</div>;
    }

    return <div>{content}</div>;
  }
}
export default PaymentHabits;
