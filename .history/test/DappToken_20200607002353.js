let DappToken = artifacts.require("./DappToken.sol")

contract("DappToken", (accounts) => {
    it("initialized the contract with the correct values", () => {
        return DappToken.deployed().then((instance) => {
            tokenInstance = instance
            return tokenInstance.name()
        }).then((name) => {
            assert.equal(name, "DappToken", "Name is equal to DappToken")
            return tokenInstance.symbol()
        }).then((symbol) => {
            assert.equal(symbol, "DTK", "Symbol is equal to DTK")
            return tokenInstance.standard()
        }).then
    })

    it("allocates the total supply upon deployment", () => {
        return DappToken.deployed().then((instance) => {
            tokenInstance = instance
            return tokenInstance.totalSupply()
        }).then((totalSupply) => {
            assert.equal(totalSupply.toNumber(), 1000000, "sets the total supply to 1,000,000")
            return tokenInstance.balanceOf(accounts[0])
        }).then((adminBalance) => {
            assert.equal(adminBalance.toNumber(), 1000000, "allocate the initial supply to the admin account")
        })
    })
})