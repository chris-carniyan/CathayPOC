/**
 * Environment Variables
 */

/* This option can be retrieved with "window.env.{$property}". */
window.env = {
  // Timeout length in seconds
  TIMEOUT_LENGTH: 1500000, //300000, 5 mins (1000ms * 60s * 5min)
  VALIDATE_TOKEN_INTERVAL: 60000, // Set this to -1 to remove the interval
  TOKEN_EXPIRED_CODE: "1003", // Code expecting from your service if the token is expired
  CORPORATE_ACCOUNT_MESSAGE: "公司戶無資料顯示",
  SESSION_TIMEOUT_MESSAGE: "網頁已失效，請重新開啟！",
  TOKEN_EXPIRED_MESSAGE: "已逾期，請重新開啟！"
};

document.addEventListener("copy", function(e) {
  if (e.target.id !== "copy") {
    e.preventDefault();
    return false;
  }
});

document.addEventListener("cut", function(e) {
  e.preventDefault();
  return false;
});
