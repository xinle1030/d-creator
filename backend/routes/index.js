const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.send("Welcome to decentralized influencer marketing platform API");
  });
};