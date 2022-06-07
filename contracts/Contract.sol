// contracts/NFT.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import 'hardhat/console.sol';

contract Contract {
  address public owner;

  constructor() {
    owner = msg.sender;
  }
}
