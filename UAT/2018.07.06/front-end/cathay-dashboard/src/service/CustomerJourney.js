import axios from "axios";
import Url from "../constants/Url";
import Helper from "../utility/Helper";

const queryParameters = Helper.getQueryParameters();

export default async function getCustomerJourneyCalendar() {
  return await axios({
    method: "GET",
    url: Url.CUSTOMER_JOURNEY_CALENDAR(
      queryParameters.header.apId,
      queryParameters.header.employeeId,
      queryParameters.uniqueNumber,
      queryParameters.header.branchId,
      queryParameters.trustKey
    )
  })
    .then(response => response)
    .catch(error => error);
}
