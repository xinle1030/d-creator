const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const app = express();
const mongoose = require("mongoose");

// Contract address of PandaCoin smart contract
// const contractAddress = process.env.pdcContractAddress;

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS middleware to handle cross-origin requests
app.use(cors());

// Setting the trust proxy header
app.set("trust proxy", true);

const Web3 = require("web3");
const fs = require("fs");

// Checking if web3 is already defined and if not, connect to a Ethereum node
if (typeof web3 !== "undefined") {
  var web3 = new Web3(web3.currentProvider);
} else {
  // connect to a eth node on goerli
  const provider =
    "https://eth-goerli.nownodes.io/6d0dc893-1c8d-449c-b2aa-5d5ab863a7c5";
  var web3 = new Web3(new Web3.providers.HttpProvider(provider));
}

const NETWORK_ID = "1422";
const influencerMarketingContract = JSON.parse(
  fs.readFileSync("./build/contracts/InfluencerMarketingContract.json", "utf8")
);
const influencerContractData = influencerMarketingContract.networks[NETWORK_ID];

const influencerContractLms = new web3.eth.Contract(influencerMarketingContract.abi, influencerContractData.address, {
  gasPrice: "60000", // default gas price in wei, 20 gwei in this case
});
influencerContractLms.setProvider(web3.currentProvider);
console.log("==== check influencer contract is deployed ====");


const kolCoinContract = JSON.parse(
  fs.readFileSync("./build/contracts/KOLCoin.json", "utf8")
);
const kolCData = kolCoinContract.networks[NETWORK_ID];

const kolCLms = new web3.eth.Contract(kolCoinContract.abi, kolCData.address, {
  gasPrice: "60000", // default gas price in wei, 20 gwei in this case
});
kolCLms.setProvider(web3.currentProvider);
console.log("==== check kolC contract is deployed ====");

// Connect to the MongoDB database
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("DB connected");

    // routes
    require("./routes/index")(app);
    require("./routes/auth")(app);
    require("./routes/creatorContract")(app, web3,  influencerContractLms, kolCLms);

    require('./routes/user.routes')(app);

    // Server Setup
    const PORT = process.env.PORT || 8080;
    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT, () => {
        console.log(`Server is running at PORT ${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

module.exports = app;
