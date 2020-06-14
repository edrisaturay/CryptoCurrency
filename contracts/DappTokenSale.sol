pragma solidity ^0.5.1;

import "./DappToken.sol";

contract DappTokenSale{
    address admin;
    DappToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokenSold;

    event Sell(
        address _buyer,
        uint256 _amount
    );

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
        require(msg.value == multiply(_numberOfTokens, tokenPrice), "");

        // Require that admin is the address sending
        // require(msg.sender == admin);
        
        // Require that the sale has enough tokens
        require(tokenContract.balanceOf(admin) >= _numberOfTokens);

        // Require that transfer is successful
        require(tokenContract.transfer(msg.sender, _numberOfTokens));

        // Keep track of tokensSold
        tokenSold += _numberOfTokens;

        // Emit sell event
        emit Sell(msg.sender, _numberOfTokens);
    }

    // Ending the token sale
    function endSale() public {
        // Require that only admin can end sale
        require(msg.sender == admin);
        
        // Transfer the remaining tokens back to the admin
        // Destroy the contract
    }

    // Multiply
    function multiply(uint256 _x, uint256 _y) internal pure returns (uint256 _z) {
        require(_y == 0 || (_z = _x * _y) / _y == _x, "");
    }
}