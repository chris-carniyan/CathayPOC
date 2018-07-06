import axios from "axios";
import Url from "../constants/Url";
import Helper from "../utility/Helper";

const queryParameters = Helper.getQueryParameters();

async function getReminder() {
  return await axios({
    method: "POST",
    url: Url.GET_REMINDER,
    data: queryParameters
  })
    .then(response => response)
    .catch(error => error);
}

async function getReminderGiftCampaign(category) {
  return await axios({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    url: Url.GET_REMINDER_GIFT_CAMPAIGN,
    data: {
      ...queryParameters,
      category
    }
  })
    .then(response => response)
    .catch(error => error);
}

export { getReminder, getReminderGiftCampaign };
