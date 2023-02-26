const CreatorContract = require("../../models/CreatorContract");
const { ObjectId } = require("mongodb");
const userUtils = require("../../utils/user_utils");

module.exports = (req, res, web3, influencerContractLms, kolCLms) => {
  console.log("Update creator contract by id");
  let contractId = req.params.contractId;
  const filter = { _id: new ObjectId(contractId) };

  // find all transactions from the db

    CreatorContract.findOneAndUpdate(filter, {
        $set: {status: 'signed'}
    }, {
      new: true,
    })
      .then(async (data) => {

        // const contractObjId = new ObjectId(contractId);
        // const hexString = contractObjId.toHexString();
        // const contractRef = '0x' + hexString.substring(0, 24);

        const creator = await userUtils.retrieveUserById(data.creator)
        const advertiser = await userUtils.retrieveUserById(data.advertiser)

        // await influencerContractLms.methods
        //   .buildContract(contractId, advertiser.walletAdrHash, creator.walletAdrHash, data.paymentDetails.flatFee)
        //   .call()

        console.log(data);
        return res.json(data);
      })
      .catch((error) => {
        console.log("Creator Contract: ", error);
      });


};
