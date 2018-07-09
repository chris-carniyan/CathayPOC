import axios from "axios";
import Url from "../constants/Url";

export default async function getCustomerJourneyDetails(
  channel,
  date,
  { header: { apId, employeeId, branchId }, uniqueNumber, trustKey }
) {
  return await axios({
    method: "GET",
    url: Url.CUSTOMER_JOURNEY_DETAIL(
      channel,
      date,
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
