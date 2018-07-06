import axios from "axios";
import Url from "../constants/Url";
import Helper from "../utility/Helper";

const queryParameter = Helper.getQueryParameters();

async function getProductRecommendation() {
  return await axios({
    method: "POST",
    url: Url.GET_PRODUCT_RECOMMENDATION,
    data: queryParameter
  })
    .then(response => response)
    .catch(error => error);
}

async function storeProductRecommendation(
  productName,
  refResult,
  customerTag,
  refMethod = null,
  refSource = null,
  obEmployeeNo = null,
  obEmployeeLastName = null
) {
  return await axios({
    method: "POST",
    url: Url.STORE_PRODUCT_RECOMMENDATION,
    data: {
      ...queryParameter,
      productName,
      refResult,
      customerTag,
      refMethod,
      refSource,
      obEmployeeNo,
      obEmployeeLastName
    }
  })
    .then(response => response)
    .catch(error => error);
}

async function retrieveProductPitch(pitchClassify) {
  return await axios({
    method: "POST",
    url: Url.RETRIEVE_PRODUCT_PITCH,
    data: { ...queryParameter, pitchClassify }
  })
    .then(response => response)
    .catch(error => error);
}

export {
  getProductRecommendation,
  storeProductRecommendation,
  retrieveProductPitch
};
