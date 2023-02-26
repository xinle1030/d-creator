const InfluencerMarketingContract = artifacts.require(
  "./InfluencerMarketingContract.sol"
);
const KOLCoin = artifacts.require("./KOLCoin.sol");

module.exports = async function (deployer) {
  await deployer.deploy(KOLCoin);
  const kolCoin = await KOLCoin.deployed();

  await deployer.deploy(InfluencerMarketingContract, kolCoin.address);
  const influencerContract = await InfluencerMarketingContract.deployed();

  const addr1 = '0x518D2976650A28F45900DB68DAD4d74926e4F4F9';

  await kolCoin.transfer(addr1, "100000000000000000000");
};