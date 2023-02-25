pragma solidity >=0.4.22 <0.9.0;

contract InfluencerMarketingContract {
    
    bytes32 public contractRef;
    address payable public brandCom;
    address payable public influencer;
    uint public contractDuration;
    uint public contractValue;
    bool public contractTerminated;
    bool public brandComApproved;
    bool public influencerApproved;
    
    modifier onlybrandCom() {
        require(msg.sender == brandCom, "Only brand company can perform this action.");
        _;
    }
    
    modifier onlyInfluencer() {
        require(msg.sender == influencer, "Only influencer can perform this action.");
        _;
    }
    
    constructor(){
        brandCom = payable(msg.sender);
    }

    function buildContract(bytes32 _contractRef, address payable _influencer, uint _duration, uint _value) public {
        contractRef = _contractRef;
        influencer = _influencer;
        contractDuration = _duration;
        contractValue = _value;
        contractTerminated = false;
        brandComApproved = false;
        influencerApproved = false;
    }
    
    function approveContract() public {
        if (msg.sender == brandCom) {
            brandComApproved = true;
        } else if (msg.sender == influencer) {
            influencerApproved = true;
        }
        if (brandComApproved && influencerApproved) {
            contractTerminated = false;
        }
    }
    
    function terminateContract() public onlybrandCom {
        contractTerminated = true;
        influencer.transfer(address(this).balance);
    }
    
    function submitWork() public onlyInfluencer payable {
        require(!contractTerminated, "Contract has been terminated.");
        require(msg.value == contractValue, "Invalid payment amount.");
        require(block.timestamp < contractDuration, "Contract has expired.");
        // Perform work
    }
    
    function releasePayment() public onlybrandCom {
        require(!contractTerminated, "Contract has been terminated.");
        influencer.transfer(address(this).balance);
    }
    
    function getContractDetails() public view returns (bytes32, address payable, address payable, uint, uint, bool, bool, bool) {
        return (contractRef, brandCom, influencer, contractDuration, contractValue, contractTerminated, brandComApproved, influencerApproved);
    }
    
}
