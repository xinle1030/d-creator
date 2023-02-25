const InfluencerMarketingContract = artifacts.require(
  "./InfluencerMarketingContract.sol"
);
const KOLCoin = artifacts.require("./KOLCoin.sol");

module.exports = async function (deployer) {
  await deployer.deploy(InfluencerMarketingContract);
  await deployer.deploy(KOLCoin);
};