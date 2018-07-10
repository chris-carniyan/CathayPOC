import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import SavingsModal from "../../components/modals/FinancialProducts/SavingsModal";
import classes from "../../assets/css/FinancialInformation.css";

class OtherFinancialProducts extends Component {
  render() {
    const otherProductsData = this.props.result;
    const {
      allDpActiveInd,
      creditLoanInd,
      houseLoanInd,
      insAgentLifeInd,
      insAgentPtyInd,
      mfInd,
      strInd
    } = otherProductsData;

    let content = null;
    let modalContent;
    let allDpActiveProduct;
    let creditLoanProduct;
    let houseLoanProduct;
    let mfProduct;
    let strProduct;
    let insAgentLifeProduct;
    let insAgentPtyProduct;

    if (allDpActiveInd === "y" || allDpActiveInd === "Y") {
      allDpActiveProduct = `${classes.otherProducts} productAvailable`;
      modalContent = <SavingsModal allDpActiveInd={allDpActiveInd} />;
    } else {
      allDpActiveProduct = `${classes.otherProducts} productNotAvailable`;
      modalContent = <span className={classes.savings}>存款</span>;
    }

    if (creditLoanInd === "y" || creditLoanInd === "Y") {
      creditLoanProduct = `${classes.otherProducts} productAvailable`;
    } else {
      creditLoanProduct = `${classes.otherProducts} productNotAvailable`;
    }

    if (houseLoanInd === "y" || houseLoanInd === "Y") {
      houseLoanProduct = `${classes.otherProducts} productAvailable`;
    } else {
      houseLoanProduct = `${classes.otherProducts} productNotAvailable`;
    }

    if (mfInd === "y" || mfInd === "Y") {
      mfProduct = `${classes.otherProducts} productAvailable`;
    } else {
      mfProduct = `${classes.otherProducts} productNotAvailable`;
    }

    if (strInd === "y" || strInd === "Y") {
      strProduct = `${classes.otherProducts} productAvailable`;
    } else {
      strProduct = `${classes.otherProducts} productNotAvailable`;
    }

    if (insAgentLifeInd === "y" || insAgentLifeInd === "Y") {
      insAgentLifeProduct = `${classes.otherProducts} productAvailable`;
    } else {
      insAgentLifeProduct = `${classes.otherProducts} productNotAvailable`;
    }

    if (insAgentPtyInd === "y" || insAgentPtyInd === "Y") {
      insAgentPtyProduct = `${classes.otherProducts} productAvailable`;
    } else {
      insAgentPtyProduct = `${classes.otherProducts} productNotAvailable`;
    }

    const otherFinancialProductsGrid = (
      <div className={classes.otherFinancialItemsDiv}>
        <Table
          basic="very"
          celled
          collapsing
          className={classes.otherFinancialProducts}
        >
          <Table.Header>
            <Table.Row textAlign="left">
              <Table.HeaderCell colSpan={3} className={allDpActiveProduct}>
                {modalContent}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row textAlign="center">
              <Table.Cell className={creditLoanProduct}>信貸</Table.Cell>
              <Table.Cell className={mfProduct} style={{ width: "120px" }}>
                基金
              </Table.Cell>
              <Table.Cell className={insAgentLifeProduct}>
                壽險(保代)
              </Table.Cell>
            </Table.Row>
            <Table.Row textAlign="center">
              <Table.Cell className={houseLoanProduct}>房貸</Table.Cell>
              <Table.Cell className={strProduct} style={{ width: "120px" }}>
                組合式 商品
              </Table.Cell>
              <Table.Cell className={insAgentPtyProduct}>產險(保代)</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );

    if (
      otherProductsData !== undefined ||
      otherProductsData !== null ||
      otherProductsData.length !== 0
    ) {
      content = <div>{otherFinancialProductsGrid}</div>;
    }

    return <div>{content}</div>;
  }
}
export default OtherFinancialProducts;
