const hre = require("hardhat");

async function main() {
  const PatientRecords = await hre.ethers.getContractFactory("PatientRecords");
  const patientRecords = await PatientRecords.deploy();
  await patientRecords.deployed();
  console.log("PatientRecords deployed to:", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
