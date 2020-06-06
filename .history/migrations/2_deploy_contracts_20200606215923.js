const DappToken = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
