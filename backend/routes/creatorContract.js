const createContract = require("../controllers/creatorContract/createContract");
const viewAllContracts = require("../controllers/creatorContract/viewAllContracts");
const viewMyContracts = require("../controllers/creatorContract/viewMyContracts");
const viewContractById = require("../controllers/creatorContract/viewContractById");
const updateContractById = require("../controllers/creatorContract/updateContractById");
const { authJwt } = require("../middlewares");

// Base URL for the account endpoints
const BASE_URL = "/api/creator-contract";

module.exports = function (app) {
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

  app.post(BASE_URL + "/", createContract);
  
};