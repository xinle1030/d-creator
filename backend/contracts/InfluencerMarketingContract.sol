pragma solidity >=0.4.22 <0.9.0;

import './KOLCoin.sol';

contract InfluencerMarketingContract {

    address public owner;
    string public currContractRef;
    ContractDetails public currentContract;
    address payable public currBrandCom;
    address payable public currInfluencer;
    KOLCoin public kolCoin;

    struct ContractDetails {
        address payable brandCom;
        address payable influencer;
        uint contractValue;
        bool contractTerminated;
        bool brandComApproved;
        bool influencerApproved;
    }

    constructor(KOLCoin _kolCoin) {
        kolCoin = _kolCoin;
        owner = msg.sender;
    }
    
    //id to contract
    mapping(string => ContractDetails) private refToContractDetails;
    
    modifier onlybrandCom() {
        require(msg.sender == currBrandCom, "Only brand company can perform this action.");
        _;
    }
    
    modifier onlyInfluencer() {
        require(msg.sender == currInfluencer, "Only influencer can perform this action.");
        _;
    }

    function buildContract(string memory _contractRef, address _brandCom, address _influencer, uint _value) public payable{
        refToContractDetails[_contractRef] = ContractDetails({
        brandCom: payable(_brandCom),
        influencer: payable(_influencer),
        contractValue: _value,
        contractTerminated: false,
        brandComApproved: false,
        influencerApproved: false
        });
    }

    function setCurrContract(string memory _contractRef) public{
        currContractRef = _contractRef;
        currentContract = refToContractDetails[currContractRef];
        currBrandCom = currentContract.brandCom;
        currInfluencer = currentContract.influencer;
    }
    
    function approveContract() public {
        if (msg.sender == currBrandCom) {
            refToContractDetails[currContractRef].brandComApproved = true;
        } else if (msg.sender == currInfluencer) {
            refToContractDetails[currContractRef].influencerApproved = true;
        }
    }
    
    function submitWork() public onlyInfluencer view{
        require(!currentContract.contractTerminated, "Contract has been terminated.");
        // Perform work
    }
    
    function releasePayment(uint _amount) public onlybrandCom {
        require(!currentContract.contractTerminated, "Contract has been terminated.");
        kolCoin.transferFrom(msg.sender, address(this), _amount);
    }
    
    function getContractDetailsByRef(string memory contractRef) public view returns (ContractDetails memory) {
        return refToContractDetails[contractRef];
    }
    
}
