// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoyaltyProgram {
    mapping(address => uint256) public balances;
    address public owner;

    event PointsIssued(address indexed to, uint256 amount);
    event PointsTransferred(address indexed from, address indexed to, uint256 amount);
    event PointsRedeemed(address indexed by, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can issue points");
        _;
    }

    function issuePoints(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "Cannot issue points to the zero address");
        balances[to] += amount;
        emit PointsIssued(to, amount);
    }

    function transferPoints(address to, uint256 amount) public {
        require(to != address(0), "Cannot transfer points to the zero address");
        require(balances[msg.sender] >= amount, "Insufficient balance to transfer points");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit PointsTransferred(msg.sender, to, amount);
    }

    function redeemPoints(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient points to redeem");
        balances[msg.sender] -= amount;
        emit PointsRedeemed(msg.sender, amount);
    }
}

