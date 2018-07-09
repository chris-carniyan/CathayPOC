import axios from "axios";
import Url from "../constants/Url";
import Helper from "../utility/Helper";

const queryParams = Helper.getQueryParameters();

async function getFinancialProducts() {
  return await axios({
    method: "POST",
    url: Url.FINANCIAL_PRODUCTS,
    data: queryParams
  })
    .then(response => response)
    .catch(error => error);
}

async function getCards(queryCardInd) {
  return await axios({
    method: "POST",
    url: Url.GET_CARDS,
    data: {
      ...queryParams,
      queryCardInd
    }
  })
    .then(response => response)
    .catch(error => error);
}

async function getPaymentHabits() {
  return await axios({
    method: "POST",
    url: Url.GET_PAYMENT_HABITS,
    data: queryParams
  })
    .then(response => response)
    .catch(error => error);
}

async function getAutoAccountDebiting() {
  return await axios({
    method: "POST",
    url: Url.GET_AUTO_ACCOUNT_DEBITING,
    data: queryParams
  })
    .then(response => response)
    .catch(error => error);
}

async function getUtilityBillsPayment() {
  return await axios({
    method: "POST",
    url: Url.GET_UTILITY_PAYMENTS,
    data: queryParams
  })
    .then(response => response)
    .catch(error => error);
}

async function getSavings() {
  return await axios({
    method: "POST",
    url: Url.GET_SAVINGS,
    data: queryParams
  })
    .then(response => response)
    .catch(error => error);
}

export {
  getFinancialProducts,
  getCards,
  getPaymentHabits,
  getAutoAccountDebiting,
  getUtilityBillsPayment,
  getSavings
};
