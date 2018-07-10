// Core
import React from "react";
// Components
import LoanButton from "./LoanButton";
import ProductSalesPitchModal from "../modals/ProductRecommendation/ProductSalesPitchModal";
import ProductRecommendationConstants from "../../constants/ProductRecommendation";

const customerDataUpdateBlock = () => (
  <ProductSalesPitchModal
    trigger={
      <LoanButton
        text={ProductRecommendationConstants.CDU_LABEL}
        bg="#FFFAA2"
      />
    }
    pitchClassify={ProductRecommendationConstants.CDU}
    modalHeader={ProductRecommendationConstants.CDU_LABEL}
  />
);

export default customerDataUpdateBlock;
