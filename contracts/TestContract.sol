pragma solidity ^0.4.24;

contract TestContract {

    uint data;
    // 2. add contract owner
    address public contractOwner;
    // 3. Event log
    event PaymentEvent(address payer, uint amount);
    // 3. Mapping

    constructor() public {
        contractOwner = msg.sender; // 2.
        data = 0;    
    }
    
    function setP(uint _n) public payable {
        // 2.
        require(msg.value > 0); // paying 0 has no meaning
        data = _n;
        // 3.
        //emit PaymentEvent(msg.sender, msg.value);
        PaymentEvent(msg.sender, msg.value);
    }

    function setNP(uint _n) public {
        data = _n;
    }

    function get() public constant returns (uint) {
        return data;
    }
    
    // 2.
    function getOwner() public view returns (address) {
        return contractOwner;
    }
    
    function balanceOfContract() public view returns(uint256) {
        return address(this).balance;
    }
    
    // 2.
    function withdraw() public {
        require(address(this).balance > 0 && contractOwner == msg.sender);
        msg.sender.transfer(address(this).balance);
    }
}
