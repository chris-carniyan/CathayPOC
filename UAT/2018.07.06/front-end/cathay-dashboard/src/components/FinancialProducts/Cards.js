import React, { Component } from "react";
import FinancialInformationCards from "../../constants/FinancialInformationCards";
import CardsModal from "../modals/FinancialProducts/CardsModal";
import classes from "../../assets/css/FinancialInformation.css";

class Cards extends Component {
  render() {
    const cardsData = this.props.result;
    const {
      businessCcCount,
      primaryCcCount,
      primarySecondCcCount,
      secondaryCcCount
    } = cardsData;

    let cardNumber = null;
    let queryCardInd;
    let content = null;
    let modalContent;
    let cardColor;
    let chevronRight;

    const cardListGrid = FinancialInformationCards.financialInformationCards.map(
      (c, k) => {
        if (c.name === "primaryCcCount") {
          cardNumber = primaryCcCount;
          queryCardInd = "P";
        } else if (c.name === "secondaryCcCount") {
          cardNumber = secondaryCcCount;
          queryCardInd = "s";
        } else if (c.name === "businessCcCount") {
          cardNumber = businessCcCount;
          queryCardInd = "B";
        } else if (c.name === "primarySecondCcCount") {
          cardNumber = primarySecondCcCount;
          queryCardInd = "F";
        }

        if (cardNumber !== 0) {
          modalContent = (
            <CardsModal cardNumber={cardNumber} queryInd={queryCardInd} />
          );
        } else {
          cardColor = {
            color: "#9A9A9A",
            marginRight: "35px"
          };
          chevronRight = null;
          modalContent = (
            <span className={classes.cardNumber} style={cardColor}>
              {cardNumber} 張 {chevronRight}
            </span>
          );
        }

        return (
          <div className={classes.cardItems} key={k}>
            <span>
              <span className={classes.cardValue}>{c.value}</span> <br />
              <span className={classes.cardSubValue}>{c.subValue}</span>
            </span>
            {modalContent}
          </div>
        );
      }
    );

    if (
      cardsData !== undefined ||
      cardsData !== null ||
      cardsData.length !== 0
    ) {
      content = <div>{cardListGrid}</div>;
    }

    return <div>{content}</div>;
  }
}

export default Cards;
