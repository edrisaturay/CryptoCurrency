pragma solidity ^0.5.1;

contract DappToken {
    // 1 - Constructor
    // 1 - Set the total number of tokens
    // 1 - Read the total number of tokens
    uint public totalSupply;

    // Getting the balance of an account using a function
    mapping(address => uint) public balanceOf;

    constructor(uint _initialSupply) public {

        // Allocate the initial supply to the master account
        balanceOf[msg.sender] = _initialSupply;

        totalSupply = _initialSupply; // Total supply of the Token

    }


}