pragma solidity ^0.5.1;

contract DappToken {
    // 1 - Constructor
    // 1 - Set the total number of tokens
    // 1 - Read the total number of tokens
    string public name = "DappToken"; // Symbol of the token
    string public symbol = "DTK"; // Name of the token
    string public standard = "DTK_v1.0"; // Standard of the token

    uint public totalSupply;

    // Getting the balance of an account using a function
    mapping(address => uint) public balanceOf;

    constructor(uint _initialSupply) public {

        // Allocate the initial supply to the master account
        balanceOf[msg.sender] = _initialSupply;

        totalSupply = _initialSupply; // Total supply of the Token

    }

    // Transfer
    function transfer(address _to, uint256 _value) public returns (bool success){
        // Trigger Transfer event
        // Trigger exception if acccount is low
        require(balanceOf[msg.sender] >= _value);

        // Transfer the value
        balanceOf[msg.sender] -= _value;
        balance
        // Return bool true if successful
    }
}