const { expect } = require("chai");

describe("Patient Records Contract", () => {
  let Contract;
  let owner;
  let admin1;
  let provider1;
  let entity1;
  let patient1;
  let patient2;

  let DEFAULT_ADMIN_ROLE;
  let ADMIN_ROLE;
  let PATIENT_ROLE;
  let PROVIDER_ROLE;
  let ENTITY_ROLE;

  beforeEach(async () => {
    PatientRecords = await ethers.getContractFactory("PatientRecords");
    [owner, admin1, provider1, entity1, patient1, patient2] =
      await ethers.getSigners();
    Contract = await PatientRecords.deploy();
    DEFAULT_ADMIN_ROLE = await Contract.DEFAULT_ADMIN_ROLE();
    ADMIN_ROLE = await Contract.ADMIN_ROLE();
    PATIENT_ROLE = await Contract.PATIENT_ROLE();
    PROVIDER_ROLE = await Contract.PROVIDER_ROLE();
    ENTITY_ROLE = await Contract.ENTITY_ROLE();
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      console.log("     Owner Address: ", owner.address);
      expect(await Contract.owner()).to.equal(owner.address);
    });
  });

  

  
});
