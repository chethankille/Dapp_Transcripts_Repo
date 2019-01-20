var Colleges = artifacts.require("Colleges.sol")

module.exports = function(deployer) {
  deployer.deploy(Colleges)
}