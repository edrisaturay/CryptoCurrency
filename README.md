# DAPP Coin

### Dependencies
* Node.js
* Truffle Framework - Tools that allow us to write smart contract - npm install -g truffle
* Ganache - local blockchain
* Metamask Extension - Allowing us to interact with the smart contract

### Setting up your project
truffle init


### Steps
* Create the contract
* Initialise with number of token available - 1


### Interacting with contract 
* Create a migration
* Migrate - truffle migrate --reset
* Open the console to interact with the contract - truffle console
* Get an instance of the token - DappToken.deployed().then(function(i){token = i})

### Testing the smart contract (Mocha Test Framework and Chai)
* Create the test file - test/DappToken.js
