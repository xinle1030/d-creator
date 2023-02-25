const CreatorContract = require("../../models/CreatorContract");
const userUtils = require("../../utils/user_utils");
const { ObjectId } = require("mongodb");

module.exports = (req, res) => {
  console.log("Get all creator contracts");
  let retData = [];
  // find all transactions from the db
  CreatorContract.find({"$and":[
    {creator: req.userId},
    {status: {"$ne" : "draft"}},
  ]})
    .sort({ _id: -1 })
    .then(async (data) => {
      for (let i in data) {
        const creator = await userUtils.retrieveUserById(data[i].creator);
        const advertiser = await userUtils.retrieveUserById(data[i].advertiser);

        retData.push({
          ...data[i]._doc,
          creator: creator.username,
          advertiser: advertiser.username,
        });
      }

      console.log(retData);
      return res.json(retData);
    })
    .catch((error) => {
      console.log("Creator Contract: ", error);
    });
};
