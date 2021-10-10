//SPDX-License-Identifier: Unlicense
pragma solidity >=0.4.22 <0.9.0;

import 'hardhat/console.sol';

contract Token {
  string public name = 'My Token';
  string public symbol = 'MYT';
  uint256 public totalSupply = 1_000_000_000;
  address public owner;
  mapping(address => uint256) public balances;

  constructor() {
    owner = msg.sender;
    balances[owner] = totalSupply;
  }

  function transfer(address to, uint256 amount) external {
    console.log('Trying to send %s tokens to: %s', amount, to);
    require(balanceOf(msg.sender) >= amount, 'Not enough tokens');
    balances[msg.sender] -= amount;
    balances[to] += amount;
  }

  function balanceOf(address account) public view returns (uint256) {
    uint256 bal = balances[account];
    console.log('Balance of %s is:', account, bal);
    return bal;
  }
}
