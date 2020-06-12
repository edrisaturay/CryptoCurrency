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
    mapping(address => uint256) public balanceOf;

    // Allowance
    // ---- _owner ----------- _spender - _value -------------------
    mapping(address => mapping(address => uint256)) public allowance;
    constructor(uint _initialSupply) public {

        // Allocate the initial supply to the master account
        balanceOf[msg.sender] = _initialSupply;

        totalSupply = _initialSupply; // Total supply of the Token

    }

    // Transfer Event
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    // Approve Event
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    // Transfer
    function transfer(address _to, uint256 _value) public returns (bool success){
        // Trigger exception if acccount is low
        require(balanceOf[msg.sender] >= _value, "You have less DTK in your account to make this transfer");

        // Transfer the value
        balanceOf[msg.sender] -= _value; // Removing the balance from admin account
        balanceOf[_to] += _value; // Adding the account to the new account

        // Trigger Transfer event
        emit Transfer(msg.sender, _to, _value);

        // Return bool true if successful
        return true;
    }

    // Delegated Transfers

    // Approve
    function approve(address _spender, uint256 _value) public returns(bool success) {
         // Trigger exception if acccount is low
        require(balanceOf[msg.sender] >= _value, "You have less DTK in your account to make this transfer");

        // allowance
        allowance[msg.sender][_spender] = _value;
        // Approve event
        emit Approval(msg.sender, _spender, _value);

        // Return bool true if successful
        return true;
    }

    // Transfer From
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        // Trigger transfer event
        emit Transfer(msg.sender, _to, _value);
        // return a boolean
        return true;
    }

}