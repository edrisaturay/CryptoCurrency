let DappTokenSale = artifacts.require("./DappTokenSale.sol")
let DappToken = artifacts.require("./DappToken.sol")

contract("DappTokenSale", (accounts) => {
    let tokenSaleInstance
    let tokenInstance
    let tokenPrice = 1000000000000000; // in wei
    let buyer = accounts[1]
    let numberOfTokens;
    it("initialized the contract with the correct values", () => {
        return DappTokenSale.deployed().then((instance) => {
            tokenSaleInstance = instance;
            return tokenSaleInstance.address
        }).then((address) => {
            assert.notEqual(address, 0x0, "has contract address")
            return tokenSaleInstance.tokenContract();
        }).then((address) => {
            assert.notEqual(address, 0x0, "has token contract address")
            return tokenSaleInstance.tokenPrice()
        }).then((price) => {
            assert.equal(price, tokenPrice, "Token price is correct")
        })
    })

    it("facilitates token buying", () => {
        return DappToken.deployed().then((instance) => {
            // First grab token instance first
            tokenInstance = instance 
            return DappTokenSale.deployed();
        }).then((instance) => {
            // Then grab the token sale instance
            tokenSaleInstance = instance
            numberOfTokens = 10
            return tokenSaleInstance.buyTokens(numberOfTokens,  { from: buyer, value: numberOfTokens * tokenPrice })
        }).then((receipt) => {
            assert.equal(receipt.logs.length, 1, "Triggers one event")
            assert.equal(receipt.logs[0].event, "Sell", "Should be the 'Sell' Event")
            assert.equal(receipt.logs[0].args._buyer, buyer, "Logs the account that purchased the tokens")
            assert.equal(receipt.logs[0].args._amount, numberOfTokens, "Logs the number of tokens purchased")
            return tokenSaleInstance.tokenSold()
        }).then((amount) => {
            assert.equal(amount.toNumber(), numberOfTokens, "increments the number of tokens sold")
            // Try to buy tokens different from the ether value
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 1 })
        }).then(assert.fail).catch((error) => {
            assert(error.message.indexOf("revert") >= 0, "msg.value must equal to number of tokens in wei")
        })
    })
})