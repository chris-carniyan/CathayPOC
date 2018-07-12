const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));
const options = {
  key: fs.readFileSync("ssl/TWRHCRM.key"),
  cert: fs.readFileSync("ssl/TWRHCRM.pem"),
  passphrase: "87936999"
};

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
https.createServer(options, app).listen(5443);
