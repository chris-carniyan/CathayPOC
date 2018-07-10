import axios from "axios";
import Url from "../constants/Url";
import Helper from "../utility/Helper";

const queryParameter = Helper.getQueryParameters();

async function getProblemPredictions() {
  return await axios({
    method: "POST",
    url: Url.GET_PROBLEM_PREDICTIONS,
    data: queryParameter
  })
    .then(response => response)
    .catch(error => error);
}

export { getProblemPredictions };
