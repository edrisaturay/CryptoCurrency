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
        }).then((standard) => {
            assert.equal(standard, "DTK_v1.0", "Has the correct standard")
        })
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

    it("transfers token ownership", () => {
        return DappToken.deployed().then((instance) => {
            tokenInstance = instance
            return tokenInstance.transfer.call(accounts[1], 10000000)
        }).then(assert.fail).catch((error) => {
            assert(error.message.indexOf("revert") >= 0, "Error message must contain revert")
            return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] })
        }).then((receipt) => {
            return tokenInstance.balanceOf(accounts[1])
        }).then((balance) => {
            assert.equal(balance.toNumber(), 250000, "adds the amount to the receiving account")
            return tokenInstance.balanceOf(accounts[0])
        })
    })
})