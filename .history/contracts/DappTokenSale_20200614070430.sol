pragma solidity ^0.5.1;

import "./DappToken.sol";

contract DappTokenSale{
    address admin;
    DappToken public tokenContract;
    uint256 public tokenPrice;
    
    constructor(DappToken _tokenContract, uint256 _tokenPrice) public {
        // Assign an admin
        admin = msg.sender;
    
        // Assign Token Contract
        tokenContract = _tokenContract;
    
        // Assign Token Price
        tokenPrice = _tokenPrice;
    }
    
    // Buy Tokens
    function buyTokens(uint256 _numberOfTokens) public payable {
        // Require that value is equal to tokens
        // Require that the sale has enough tokens
        // Require that transfer is successful
        // Keep track of tokensSold

        // Emit sell event
    }
}