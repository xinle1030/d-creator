const CreatorContract = require("../../models/CreatorContract");
const userUtils = require("../../utils/user_utils");

module.exports = (req, res) => {
  console.log("Get creator contract by id");
  let retData = {}
  let contractId = req.params.contractId;
  // find all transactions from the db
  CreatorContract.findById(contractId)
    .sort({ _id: -1 })
    .then(async (data) => {
      if (data){
      const creator = await userUtils.retrieveUserById(data.creator);
      const advertiser = await userUtils.retrieveUserById(data.advertiser);

      retData = {
        ...data._doc,
        creator: creator,
        advertiser: advertiser,
      };

      }
      console.log(retData);
      return res.json(retData);
    })
    .catch((error) => {
      console.log("Creator Contract: ", error);
    });
};
