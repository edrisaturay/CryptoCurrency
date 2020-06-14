let DappTokenSale = artifacts.require("./DappTokenSale.sol")

contract("DappTokenSale", (accounts) => {
    let tokenSaleInstance;
    let tokenPrice = 1000000000000000; // in wei

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
            tokenSaleInstance = instance;
            let numberOfTokens = 10;
            let value = numberOfTokens * tokenPrice;
            return tokenSaleInstance.buyTokens(numberOfTokens,  { from: buyer, value: value})
        }).then((receipt) => {
            return 
        })
    })
})