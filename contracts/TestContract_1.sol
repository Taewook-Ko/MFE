pragma solidity ^0.4.24;

contract TestContract {

    uint data;

    constructor() public {
        data = 0;    
    }
    
    function setP(uint _n) public payable {
        data = _n;
    }

    function setNP(uint _n) public {
        data = _n;
    }

    function get () public constant returns (uint) {
        return data;
    }
    
    function balanceOfContract() public view returns(uint256) {
        return address(this).balance;
    }
}
