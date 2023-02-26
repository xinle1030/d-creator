const CreatorContract = require("../../models/CreatorContract");
const { ObjectId } = require("mongodb");
const ethers = require('ethers');
const userUtils = require("../../utils/user_utils");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

const send = async (sender, receiver, txnData, web3) => {
  const addressFrom = sender.walletAdrHash;
  const addressFromPK = process.env.ADVERTISER_PK;
  const addressTo = receiver.walletAdrHash;

  console.log(`Attempting to send transaction from ${addressFrom} to ${addressTo}`);

  try {
    // Sign transaction with PK
    const createTransaction = await web3.eth.accounts.signTransaction({
      gas: 60000,
      to: process.env.KOL_COIN_ADDR,
      data: txnData,
    }, addressFromPK);

    console.log(createTransaction);

    // Send transaction and wait for receipt
    const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
    console.log(`Transaction successful with hash: ${createReceipt.transactionHash}`);

    // Return the transaction hash
    return createReceipt.transactionHash;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send transaction');
  }
};


module.exports = (req, res, web3, influencerContractLms, kolCLms) => {
  console.log("Update creator contract by id");
  let contractId = req.params.contractId;
  const filter = { _id: new ObjectId(contractId) };

  // find all transactions from the db

    CreatorContract.findOneAndUpdate(filter, {
        $set: {status: 'completed'}
    }, {
      new: true,
    })
      .then(async (data) => {

                const creator = await userUtils.retrieveUserById(data.creator)
        const advertiser = await userUtils.retrieveUserById(data.advertiser)

        const amount = await web3.utils.toBN(data.paymentDetails.flatFee.toString());

        const senderAddr = advertiser.walletAdrHash
        const receiverAddr = creator.walletAdrHash
        const txnData = kolCLms.methods.transfer(receiverAddr, amount).encodeABI();

          // perform transaction
  const hash = await send(advertiser, creator, txnData, web3);
  console.log(hash)
  return hash;
      })
    }
      
