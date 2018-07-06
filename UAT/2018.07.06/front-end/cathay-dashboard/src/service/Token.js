import axios from "axios";
import Url from "../constants/Url";
import Helper from "../utility/Helper";

const { uniqueNumber, ...request } = Helper.getQueryParameters();

async function validateToken() {
  return await axios({
    method: "POST",
    url: Url.VALIDATE_TOKEN,
    headers: { Accept: "application/json" },
    data: request
  })
    .then(response => response)
    .catch(error => error);
}

export { validateToken };
