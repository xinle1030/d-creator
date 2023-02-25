const CreatorContract = require("../../models/CreatorContract");
const userUtils = require("../../utils/user_utils");

module.exports = async (req, res) => {
  console.log(req.body);

  const creator = await userUtils.retrieveUserByUsername(
      req.body.creatorUsername
    );
  const advertiser = await userUtils.retrieveUserByUsername(
    req.body.advertiserUsername
  );

  // create transaction history
  const contractData = {
    dateOfAgreement: req.body.dateOfAgreement,
    creator: creator._id,
    advertiser: advertiser._id,
    contractStartDate: req.body.startDate,
    contractEndDate: req.body.endDate,
    copyright: req.body.copyright == "creator" ? creator._id : advertiser._id,
    publishedContent: {
      content: req.body.content,
      platforms: req.body.platforms,
    },
    paymentDetails: {
      flatFee: req.body.flatFee,
      paymentTerm: req.body.paymentTerm,
    },
    exclusivity: {
      competitor: req.body.competitor,
      isExclusive: req.body.isExclusive,
      exclusivePeriod: req.body.exclusivePeriod,
    },
  };

  try {
    let contractCreated = await CreatorContract.create(contractData);
    console.log("Creator contract created");
    return res.json(contractCreated);;
  } catch (error) {
    // Handle error
    throw error;
  }
};
