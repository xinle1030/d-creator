const createContract = require("../controllers/creatorContract/createContract");
const viewAllContracts = require("../controllers/creatorContract/viewAllContracts");
const viewMyContracts = require("../controllers/creatorContract/viewMyContracts");
const viewContractById = require("../controllers/creatorContract/viewContractById");
const updateContractById = require("../controllers/creatorContract/updateContractById");
const updateContractByInstantiation = require("../controllers/creatorContract/updateContractByInstantiation");
const updateContractBySign = require("../controllers/creatorContract/updateContractBySign");
const updateContractByApprove = require("../controllers/creatorContract/updateContractByApprove");
const updateContractByPayment = require("../controllers/creatorContract/updateContractByPayment");


const { authJwt } = require("../middlewares");

// Base URL for the account endpoints
const BASE_URL = "/api/creator-contract";

module.exports = function (app, web3,  influencerContractLms, kolCLms) {
  // Middleware that sets the Access-Control-Allow-Headers header for incoming requests
  // app.use(function (req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });

  app.get(BASE_URL + "/", viewAllContracts);

  app.get(
    BASE_URL + "/myContracts",
    [authJwt.verifyToken, authJwt.isCreator],
    viewMyContracts
  );

  app.get(BASE_URL + "/:contractId", viewContractById);

  app.put(BASE_URL + "/:contractId", updateContractById);

      app.put(BASE_URL + "/:contractId/payment", (req, res) => {
    updateContractByPayment(req, res, web3, influencerContractLms, kolCLms)});

    app.put(BASE_URL + "/:contractId/approve", (req, res) => {
    updateContractByApprove(req, res, web3, influencerContractLms, kolCLms)});

  app.put(BASE_URL + "/:contractId/instantiate", (req, res) => {
    updateContractByInstantiation(req, res, web3, influencerContractLms, kolCLms)});

      app.put(BASE_URL + "/:contractId/sign", (req, res) => {
    console.log(influencerContractLms._address);
    console.log(kolCLms._address);
    updateContractBySign(req, res, web3, influencerContractLms, kolCLms)});

  app.post(BASE_URL + "/", createContract);
  
};