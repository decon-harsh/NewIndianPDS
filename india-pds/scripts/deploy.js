// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Verification = await hre.ethers.getContractFactory("VerificationContract");
  const verification = await Verification.deploy();
  await verification.deployed();
  console.log("verification is deployed to: ", verification.address);

  const Provenance = await hre.ethers.getContractFactory("ProvenanceContract");
  const provenance = await Provenance.deploy();
  await provenance.deployed();
  console.log("provenance is deployed to: ", provenance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });