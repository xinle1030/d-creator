const CreatorContract = require("../../models/CreatorContract");
const { ObjectId } = require("mongodb");

module.exports = (req, res) => {
  console.log("Update creator contract by id");
  let contractId = req.params.contractId;
  const filter = { _id: new ObjectId(contractId) };

  let update = req.body.update;
  // find all transactions from the db

  if (update.publishedContent && update.publishedContent.workDone) {
    CreatorContract.findOneAndUpdate(
      filter,
      {
        $set: {
          "publishedContent.workDone": update.publishedContent.workDone,
        },
      },
      {
        upsert: true,
      }
    )
      .then(async (data) => {
        console.log(data);
        return res.json(data);
      })
      .catch((error) => {
        console.log("Creator Contract: ", error);
      });
  } else {
    CreatorContract.findOneAndUpdate(filter, update, {
      new: true,
    })
      .then(async (data) => {
        console.log(data);
        return res.json(data);
      })
      .catch((error) => {
        console.log("Creator Contract: ", error);
      });
  }


};
