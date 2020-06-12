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
            return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] })
        }).then((success) => {
            assert.equal(success, true, "It returns true")
            return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] })
        }).then((receipt) => {
            assert.equal(receipt.logs.length, 1, "Triggers one event")
            assert.equal(receipt.logs[0].event, "Transfer", "Should be the 'Transfer' Event")
            assert.equal(receipt.logs[0].args._from, accounts[0], "Logs the account the tokens are transfered from")
            assert.equal(receipt.logs[0].args._to, accounts[1], "Logs the account the tokens are transfered to")
            assert.equal(receipt.logs[0].args._value, 250000, "Logs the transfer amount")
            return tokenInstance.balanceOf(accounts[1])
        }).then((balance) => {
            assert.equal(balance.toNumber(), 250000, "Adds the amount to the receiving account")
            return tokenInstance.balanceOf(accounts[0])
        }).then((balance) => {
            assert.equal(balance.toNumber(), 750000, "Deducts the amount from the sending account")
        })

    })

    it("approves tokens for deligated transfer", () => {
        return DappToken.deployed().then((instance) => {
            tokenInstance = instance
            return tokenInstance.approve.call(accounts[1], 100)
        }).then((success) => {
            assert.equal(success, true, "it returns true")
            return tokenInstance.approve(accounts[1], 100, {from: accounts[0] })
        }).then((receipt) => {
            assert.equal(receipt.logs.length, 1, "Triggers one event")
            assert.equal(receipt.logs[0].event, "Approval", "Should be the 'Approval' Event")
            assert.equal(receipt.logs[0].args._owner, accounts[0], "Logs the account the tokens are authorized by")
            assert.equal(receipt.logs[0].args._spender, accounts[1], "Logs the account the tokens are authorized to")
            assert.equal(receipt.logs[0].args._value, 100, "Logs the transfer amount")
            return tokenInstance.allowance(accounts[0], accounts[1])
        }).then((allowance) => {
            assert.equal(allowance, 100, "Stores the allowance for delegated transfer")
        })
    })

    it("Handles deligated token transfers", () => {
        return DappToken.deployed().then((instance) => {
            tokenInstance = instance
            fromAccount = accounts[2]
            toAccount = accounts[3]
            spendingAccount = accounts[4]
            return tokenInstance.transfer(fromAccount, 100, { from: accounts[0] })
        }).then((receipt) => {
            // Approve spendingAccount to spend 10 tokens from fromAccount
            return tokenInstance.approve(spendingAccount, 10, { from: fromAccount })
        }).then((receipt) => {
            // Try transfering something larger than the sender balance
            return tokenInstance.transferFrom(fromAccount, toAccount, , { from: })
        })
    })
})