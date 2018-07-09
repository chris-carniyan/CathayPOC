import ip from "ip";

export default {
  getQueryParameters: () => {
    const queryParameter = {};
    const queryString = window.location.search.substring(1).split("&");

    queryString.forEach(params => {
      let temp = params.split("=");
      queryParameter[temp[0]] = temp[1];
    });

    const {
      apId,
      branchId,
      employeeId,
      uniqueNumber,
      trustKey
    } = queryParameter;

    return {
      header: {
        apId,
        branchId,
        employeeId,
        clientIp: ip.address(),
        txnDateTime: +new Date()
      },
      uniqueNumber,
      trustKey
    };
  }
};
