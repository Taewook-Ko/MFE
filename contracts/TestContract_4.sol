pragma solidity ^0.4.24;

// 4. import and SafeMath
import "./SafeMath.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol";

contract TestContract {

    // 4.
    using SafeMath for uint;
    
    uint data;
    // 2. add contract owner
    address contractOwner;
    // 3. Event log
    event PaymentEvent(address payer, uint amount);

    constructor() public {
        contractOwner = msg.sender; // 2.
        data = 0;    
    }
    
    function setP(uint _n) public payable {
        // 2.
        require(msg.value > 0); // paying 0 has no meaning
        // 4.
        //data = _n;
        data = data.add(_n); // instead data = data + _n;
        // 3.
        emit PaymentEvent(msg.sender, msg.value);
    }

    function setNP(uint _n) public {
        // 4.
        //data = _n;
        data = data.add(_n); // instead value = value + _n;
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
