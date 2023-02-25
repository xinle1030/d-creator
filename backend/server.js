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

// Load PandaCoin smart contract ABI and create contract instance
// const pandaCoinContract = JSON.parse(
//   fs.readFileSync("./build/contracts/PandaCoin.json", "utf8")
// );
// const CONTRACT_ABI = pandaCoinContract.abi;

// panda coin contract
// const lms = new web3.eth.Contract(CONTRACT_ABI, contractAddress, {
//   gasPrice: "60000", // default gas price in wei, 20 gwei in this case
// });
// lms.setProvider(web3.currentProvider);

// console.log(lms._address);
console.log("==== check contract is deployed ====");

// Connect to the MongoDB database
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("DB connected");

    // routes
    require("./routes/index")(app);
    require("./routes/auth")(app);
    require("./routes/creatorContract")(app);

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
