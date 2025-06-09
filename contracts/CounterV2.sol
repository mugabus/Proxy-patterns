// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;
import "./CounterV1.sol";

contract CounterV2 is CounterV1 {
    function decrement() public {
        require(count > 0, "Underflow");
        count -= 1;
    }
}
