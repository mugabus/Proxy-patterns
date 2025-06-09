// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol"; // Often useful for upgradeable contracts
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol"; // Correct path for Initializable

contract CounterV1 is Initializable { // Note the correct spelling: Initializable
    uint public count;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers(); // Important for upgradeable contracts to prevent reinitialization through the constructor
    }

    function initialize() public initializer {
        count = 0;
    }

    function increment() public {
        count += 1;
    }

    function decrement() public {
        require(count > 0, "the count is already zero");
        count -= 1;
    }

    function getCount() public view returns (uint) {
        return count;
    }
}