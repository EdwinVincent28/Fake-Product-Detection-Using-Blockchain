const Migrations = artifacts.require("Manufacturer.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
