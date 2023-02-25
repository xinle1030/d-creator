const mongoose = require("mongoose");

const creatorContractSchema = new mongoose.Schema({
  dateOfAgreement: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  advertiser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  contractStartDate: {
    type: String,
    required: true,
  },
  contractEndDate: {
    type: String,
    required: true,
  },
  copyright: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  publishedContent: {
    workDone: {type: String},
    content: { type: String, required: true },
    platforms: { type: String, required: true },
  },
  paymentDetails: {
    flatFee: { type: Number, required: true },
    paymentTerm: { type: Number, required: true },
  },
  exclusivity: {
    competitor: { type: String, required: true },
    isExclusive: { type: String, required: true },
    exclusivePeriod: { type: Number },
  },
  status: {
    type: String,
    required: true,
    default: "draft",
    enum: [
      "draft", // draft contract
      "in progress", // wait for creator agree
      "agreed", // creator agree
      "initiated", // advertiser initiate and sign contract
      "signed", // creator sign and contract is active now that the creator shall submit his work
      "inactive", // creator's submitted work has been approved
      "completed", // contract is completed and money has been released
    ],
  },
});

module.exports = mongoose.model("creatorContract", creatorContractSchema);
