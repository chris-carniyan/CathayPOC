/* DEV */
/*export default {
  CUSTOMER_JOURNEY_CALENDAR: (
    ap_id,
    teller_id,
    unique_number,
    branch,
    token
  ) => {
    return `http://172.26.53.133:8080/customer-journey/journey?ap_id=${ap_id}&teller_id=${teller_id}&unique_number=${unique_number}&branch=${branch}&token=${token}`;
  },

  CUSTOMER_JOURNEY_DETAIL: (
    channel,
    date,
    ap_id,
    teller_id,
    unique_number,
    branch,
    token
  ) => {
    return `http://172.26.53.133:8080/customer-journey/journey/detail?channel=${channel}&date=${date}&ap_id=${ap_id}&teller_id=${teller_id}&unique_number=${unique_number}&branch=${branch}&token=${token}`;
  },

  STORE_PRODUCT_RECOMMENDATION:
    "http://172.26.53.133:8080/product-recommendation/storeRecommendation",

  CUSTOMER_PROFILE_ORACLE:
    "http://172.26.53.133:8080/customer-profile/getCustomerProfile",

  GET_PRODUCT_RECOMMENDATION:
    "http://172.26.53.133:8080/product-recommendation/getRecommendationAndCPIN",

  CUSTOMER_PROFILE_MONGO: (ap_id, teller_id, unique_number, branch, token) => {
    return `http://172.26.53.133:8080/customer-profile/profile?ap_id=${ap_id}&teller_id=${teller_id}&unique_number=${unique_number}&branch=${branch}&token=${token}`;
  },

  CUSTOMER_PROFILE_GREET_CUSTOMER_ORACLE:
    "http://172.26.53.133:8080/customer-profile/greetCustomerBirthday",

  FINANCIAL_PRODUCTS:
    "http://172.26.53.133:8080/financial-product/getCustomerFinancialProducts",

  GET_CARDS: `http://172.26.53.133:8080/financial-product/getCards`,

  GET_PAYMENT_HABITS: `http://172.26.53.133:8080/financial-product/getPaymentHabits`,

  GET_AUTO_ACCOUNT_DEBITING: `http://172.26.53.133:8080/financial-product/getAutoAccountDebiting`,

  GET_UTILITY_PAYMENTS: `http://172.26.53.133:8080/financial-product/getUtilityBillsPayments`,

  GET_SAVINGS: `http://172.26.53.133:8080/financial-product/getSavings`,

  GET_REMINDER: "http://172.26.53.133:8080/reminders/getReminders",

  CUSTOMER_PROFILE_COMPLAINTS_MONGO: (
    apId,
    employeeId,
    uniqueNumber,
    branchId,
    trustKey
  ) =>
    `http://172.26.53.133:8080/customer-profile/profile/complaint?ap_id=${apId}&teller_id=${employeeId}&unique_number=${uniqueNumber}&branch=${branchId}&token=${trustKey}`,

  RETRIEVE_PRODUCT_PITCH:
    "http://172.26.53.133:8080/product-recommendation/retrieveProductPitch",

  GET_PROBLEM_PREDICTIONS:
    "http://172.26.53.133:8080/predictions/problem-predict",

  VALIDATE_TOKEN:
    "https://virtserver.swaggerhub.com/jicunxi05/token_validation/1.0.0/crm-encrypt/p2/validateTrustKey",

  GET_REMINDER_GIFT_CAMPAIGN:
    "http://172.26.53.133:8080/reminders/getReminderActivitiesOrGiftDetails"
};*/

/* UT */
export default {
  CUSTOMER_JOURNEY_CALENDAR: (
    ap_id,
    teller_id,
    unique_number,
    branch,
    token
  ) => {
    return `http://88.8.196.94:8080/customer-journey/journey?ap_id=${ap_id}&teller_id=${teller_id}&unique_number=${unique_number}&branch=${branch}&token=${token}`;
  },

  CUSTOMER_JOURNEY_DETAIL: (
    channel,
    date,
    ap_id,
    teller_id,
    unique_number,
    branch,
    token
  ) => {
    return `http://88.8.196.94:8080/customer-journey/journey/detail?channel=${channel}&date=${date}&ap_id=${ap_id}&teller_id=${teller_id}&unique_number=${unique_number}&branch=${branch}&token=${token}`;
  },

  STORE_PRODUCT_RECOMMENDATION:
    "http://88.8.196.94:8080/product-recommendation/storeRecommendation",

  CUSTOMER_PROFILE_ORACLE:
    "http://88.8.196.94:8080/customer-profile/getCustomerProfile",

  GET_PRODUCT_RECOMMENDATION:
    "http://88.8.196.94:8080/product-recommendation/getRecommendationAndCPIN",

  CUSTOMER_PROFILE_MONGO: (ap_id, teller_id, unique_number, branch, token) => {
    return `http://88.8.196.94:8080/customer-profile/profile?ap_id=${ap_id}&teller_id=${teller_id}&unique_number=${unique_number}&branch=${branch}&token=${token}`;
  },

  CUSTOMER_PROFILE_GREET_CUSTOMER_ORACLE:
    "http://88.8.196.94:8080/customer-profile/greetCustomerBirthday",

  FINANCIAL_PRODUCTS:
    "http://88.8.196.94:8080/financial-product/getCustomerFinancialProducts",

  GET_CARDS: `http://88.8.196.94:8080/financial-product/getCards`,

  GET_PAYMENT_HABITS: `http://88.8.196.94:8080/financial-product/getPaymentHabits`,

  GET_AUTO_ACCOUNT_DEBITING: `http://88.8.196.94:8080/financial-product/getAutoAccountDebiting`,

  GET_UTILITY_PAYMENTS: `http://88.8.196.94:8080/financial-product/getUtilityBillsPayments`,

  GET_SAVINGS: `http://88.8.196.94:8080/financial-product/getSavings`,

  GET_REMINDER: "http://88.8.196.94:8080/reminders/getReminders",

  CUSTOMER_PROFILE_COMPLAINTS_MONGO: (
    apId,
    employeeId,
    uniqueNumber,
    branchId,
    trustKey
  ) =>
    `http://88.8.196.94:8080/customer-profile/profile/complaint?ap_id=${apId}&teller_id=${employeeId}&unique_number=${uniqueNumber}&branch=${branchId}&token=${trustKey}`,

  RETRIEVE_PRODUCT_PITCH:
    "http://88.8.196.94:8080/product-recommendation/retrieveProductPitch",

  GET_PROBLEM_PREDICTIONS:
    "http://88.8.196.94:8080/predictions/problem-predict",

  VALIDATE_TOKEN: "http://88.8.111.50:8080/crm-encrypt/p2/validateTrustKey",

  GET_REMINDER_GIFT_CAMPAIGN:
    "http://88.8.196.94:8080/reminders/getReminderActivitiesOrGiftDetails"
};
