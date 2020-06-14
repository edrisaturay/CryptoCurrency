let DappTokenSale = artifacts.require("./DappTokenSale.sol")

contract("DappTokenSale", (accounts) => {
    let tokenSaleInstance
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
        return DappTokenSale.deployed().then((instance) => {
            tokenSaleInstance = instance
            numberOfTokens = 10
            return tokenSaleInstance.buyTokens(numberOfTokens,  { from: buyer, value: numberOfTokens * tokenPrice })
        }).then((receipt) => {
            assert.equal(receipt.logs.length, 1, "Triggers one event")
            assert.equal(receipt.logs[0].event, "Sell", "Should be the 'Transfer' Event")
            assert.equal(receipt.logs[0].args._from, fromAccount, "Logs the account the tokens are transfered from")
            assert.equal(receipt.logs[0].args._to, toAccount, "Logs the account the tokens are transfered to")
            assert.equal(receipt.logs[0].args._value, 10, "Logs the transfer amount")
            return tokenSaleInstance.tokenSold()
        }).then((amount) => {
            assert.equal(amount.toNumber(), numberOfTokens, "increments the number of tokens sold")
        })
    })
})