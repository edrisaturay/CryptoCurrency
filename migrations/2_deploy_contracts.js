const DappToken = artifacts.require("DappToken")
const DappTokenSale = artifacts.require("DappTokenSale")

module.exports = function(deployer) {
  deployer.deploy(DappToken, 1000000).then(() => {
    let tokenPrice = 1000000000000000 // 0.001 Ethers
    return deployer.deploy(DappTokenSale, DappToken.address, tokenPrice)
  })
}