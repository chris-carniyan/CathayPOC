import axios from "axios";
import Url from "../constants/Url";
import Helper from "../utility/Helper";

const {
  header: { apId, employeeId, branchId },
  uniqueNumber,
  trustKey
} = Helper.getQueryParameters();

async function getCustomerProfileOracle() {
  return await axios({
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    url: Url.CUSTOMER_PROFILE_ORACLE,
    data: {
      apId,
      tellerId: employeeId,
      branchNo: branchId,
      uniqueNumber,
      trustKey
    }
  })
    .then(response => response)
    .catch(error => error);
}

async function getCustomerProfileMongo() {
  return await axios({
    method: "GET",
    url: Url.CUSTOMER_PROFILE_MONGO(
      apId,
      employeeId,
      uniqueNumber,
      branchId,
      trustKey
    )
  })
    .then(response => response)
    .catch(error => error);
}

async function greetCustomer(customerName, ccVipInd, bankVipInd) {
  return await axios({
    method: "POST",
    url: Url.CUSTOMER_PROFILE_GREET_CUSTOMER_ORACLE,
    data: {
      apId,
      tellerId: employeeId,
      uniqueNumber,
      branchNo: branchId,
      trustKey,
      customerName,
      ccVipInd,
      bankVipInd
    }
  })
    .then(response => response)
    .catch(error => error);
}

async function getCustomerProfileComplaintsMongo() {
  return await axios({
    method: "GET",
    url: Url.CUSTOMER_PROFILE_COMPLAINTS_MONGO(
      apId,
      employeeId,
      uniqueNumber,
      branchId,
      trustKey
    )
  })
    .then(response => response)
    .catch(error => error);
}

export {
  getCustomerProfileOracle,
  getCustomerProfileMongo,
  greetCustomer,
  getCustomerProfileComplaintsMongo
};
