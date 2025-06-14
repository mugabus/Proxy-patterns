// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
contract CounterV1 is Initialable{
    uint public count;


    function initialize() public initializer{
        count =0;
    }       

    function increment() public {
        count +=1;
    }

    function decrement() public{
        require(count > 0,"the count is already zero");
        count -=1;
    }

    function getCount() public view returns(uint){
        return count;
    }
}