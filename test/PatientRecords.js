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

  describe("Owner/Deployer Address Assertion", () => {
    it("Owner role is DEFAULT_ACCOUNT_ROLE", async () => {
      expect(
        await Contract.hasRole(DEFAULT_ADMIN_ROLE, owner.address)
      ).to.equal(true);
    });
    it("The admin of the owner role is DEFAULT_ACCOUNT_ROLE", async () => {
      expect(await Contract.getRoleAdmin(DEFAULT_ADMIN_ROLE)).to.equal(
        DEFAULT_ADMIN_ROLE
      );
    });
    it("Owner role is not ADMIN_ROLE", async () => {
      expect(await Contract.hasRole(ADMIN_ROLE, owner.address)).to.equal(false);
    });
    it("Owner role is not PATIENT_ROLE", async () => {
      expect(await Contract.hasRole(PATIENT_ROLE, owner.address)).to.equal(
        false
      );
    });
    it("Owner role is not PROVIDER_ROLE", async () => {
      expect(await Contract.hasRole(PROVIDER_ROLE, owner.address)).to.equal(
        false
      );
    });
    it("Owner role is not ENTITY_ROLE", async () => {
      expect(await Contract.hasRole(ENTITY_ROLE, owner.address)).to.equal(
        false
      );
    });
  });

  describe("Admin Address Assertion", () => {
    it("Admin role is Admin", async () => {
      await Contract.registerAdmin(admin1.address);
      expect(await Contract.hasRole(ADMIN_ROLE, admin1.address)).to.equal(true);
    });
    it("The admin of the admin role is DEFAULT_ACCOUNT_ROLE", async () => {
      expect(await Contract.getRoleAdmin(ADMIN_ROLE)).to.equal(
        DEFAULT_ADMIN_ROLE
      );
    });
    it("Admin role is ADMIN_ROLE", async () => {
      await Contract.registerAdmin(admin1.address);
      expect(await Contract.hasRole(ADMIN_ROLE, admin1.address)).to.equal(true);
    });
    it("Admin role is not PATIENT_ROLE", async () => {
      await Contract.registerAdmin(admin1.address);
      expect(await Contract.hasRole(PATIENT_ROLE, admin1.address)).to.equal(
        false
      );
    });
    it("Admin role is not PROVIDER_ROLE", async () => {
      await Contract.registerAdmin(admin1.address);
      expect(await Contract.hasRole(PROVIDER_ROLE, admin1.address)).to.equal(
        false
      );
    });
    it("Admin role is not ENTITY_ROLE", async () => {
      await Contract.registerAdmin(admin1.address);
      expect(await Contract.hasRole(ENTITY_ROLE, admin1.address)).to.equal(
        false
      );
    });
    it("Admin role is not DEFAULT_ADMIN_ROLE", async () => {
      await Contract.registerAdmin(admin1.address);
      expect(
        await Contract.hasRole(DEFAULT_ADMIN_ROLE, admin1.address)
      ).to.equal(false);
    });
  });

  describe("Provider Address Assertion", () => {
    it("Provider role is Provider", async () => {
      await Contract.registerProvider(provider1.address);
      expect(await Contract.hasRole(PROVIDER_ROLE, provider1.address)).to.equal(
        true
      );
    });
    it("The admin of the provider role is DEFAULT_ACCOUNT_ROLE", async () => {
      expect(await Contract.getRoleAdmin(PROVIDER_ROLE)).to.equal(
        DEFAULT_ADMIN_ROLE
      );
    });
    it("Provider role is PROVIDER_ROLE", async () => {
      await Contract.registerProvider(provider1.address);
      expect(await Contract.hasRole(PROVIDER_ROLE, provider1.address)).to.equal(
        true
      );
    });
    it("Provider role is not PATIENT_ROLE", async () => {
      await Contract.registerProvider(provider1.address);
      expect(await Contract.hasRole(PATIENT_ROLE, provider1.address)).to.equal(
        false
      );
    });
    it("Provider role is not ADMIN_ROLE", async () => {
      await Contract.registerProvider(provider1.address);
      expect(await Contract.hasRole(ADMIN_ROLE, provider1.address)).to.equal(
        false
      );
    });
    it("Provider role is not ENTITY_ROLE", async () => {
      await Contract.registerProvider(provider1.address);
      expect(await Contract.hasRole(ENTITY_ROLE, provider1.address)).to.equal(
        false
      );
    });
    it("Provider role is not DEFAULT_ADMIN_ROLE", async () => {
      await Contract.registerProvider(provider1.address);
      expect(
        await Contract.hasRole(DEFAULT_ADMIN_ROLE, provider1.address)
      ).to.equal(false);
    });
  });

  describe("Modifier Testing", () => {
    it("notOwner modifier is working as expected", async () => {
      await expect(Contract.registerAdmin(owner.address)).to.be.revertedWith(
        "Owner account can not execute this operation"
      );
    });
    it("onlyNew modifier is working as expected", async () => {
      await Contract.registerAdmin(admin1.address);

      await expect(Contract.registerAdmin(admin1.address)).to.be.revertedWith(
        "This account already have this role"
      );
    });
    it("onlyVerifiedProvider modifier is working as expected", async () => {
      await Contract.registerAdmin(admin1.address);
      await Contract.registerPatient(patient1.address);
      await expect(
        Contract.connect(admin1).assignPatientToDoctor(
          patient1.address,
          provider1.address
        )
      ).to.be.revertedWith("This account must be a registered provider");
    });
    it("onlyRegisteredPatient modifier is working as expected", async () => {
      await Contract.registerAdmin(admin1.address);
      await Contract.registerProvider(provider1.address);
      await expect(
        Contract.connect(admin1).assignPatientToDoctor(
          patient1.address,
          provider1.address
        )
      ).to.be.revertedWith("This account must be a registered patient");
    });
  });

  describe("Owner Register Admin", () => {
    it("Admin 1 is role not an admin yet", async () => {
      expect(await Contract.hasRole(ADMIN_ROLE, admin1.address)).to.equal(
        false
      );
    });
    it("Admin 1 is not a verified user yet", async () => {
      expect(await Contract.isAccountVerified(admin1.address)).to.equal(false);
    });
    it("Owner register a new admin (Admin 1)", async () => {
      await Contract.registerAdmin(admin1.address);
      expect(await Contract.hasRole(ADMIN_ROLE, admin1.address)).to.equal(true);
    });
    it("Admin 1 is now verified user", async () => {
      await Contract.registerAdmin(admin1.address);
      expect(await Contract.isAccountVerified(admin1.address)).to.equal(true);
    });
    it("Owner can not register Admin 1 again", async () => {
      await Contract.registerAdmin(admin1.address);
      await expect(Contract.registerAdmin(admin1.address)).to.be.revertedWith(
        "This account already have this role"
      );
    });
    it("The Owner can not register as an admin", async () => {
      await expect(Contract.registerAdmin(owner.address)).to.be.revertedWith(
        "Owner account can not execute this operation"
      );
    });
  });

  describe("Owner Register Provider", () => {
    it("Provider 1 role is not a provider yet", async () => {
      expect(await Contract.hasRole(PROVIDER_ROLE, provider1.address)).to.equal(
        false
      );
    });
    it("Provider 1 is not a verified user yet", async () => {
      expect(await Contract.isAccountVerified(provider1.address)).to.equal(
        false
      );
    });
    it("Owner register a new provider (Provider 1)", async () => {
      await Contract.registerProvider(provider1.address);
      expect(await Contract.hasRole(PROVIDER_ROLE, provider1.address)).to.equal(
        true
      );
    });
    it("Provider 1 is now verified user", async () => {
      await Contract.registerProvider(provider1.address);
      expect(await Contract.isAccountVerified(provider1.address)).to.equal(
        true
      );
    });
    it("Owner can not register Provider 1 again", async () => {
      await Contract.registerProvider(provider1.address);
      await expect(
        Contract.registerProvider(provider1.address)
      ).to.be.revertedWith("This account already have this role");
    });
    it("The Owner can not register as a Provider", async () => {
      await expect(Contract.registerProvider(owner.address)).to.be.revertedWith(
        "Owner account can not execute this operation"
      );
    });
  });

  describe("Owner Register Entity", () => {
    it("Entity 1 role is not an entity yet", async () => {
      expect(await Contract.hasRole(ENTITY_ROLE, entity1.address)).to.equal(
        false
      );
    });
    it("Entity 1 is not a verified user yet", async () => {
      expect(await Contract.isAccountVerified(entity1.address)).to.equal(false);
    });
    it("Owner register a new entity (Entity 1)", async () => {
      await Contract.registerEntity(entity1.address);
      expect(await Contract.hasRole(ENTITY_ROLE, entity1.address)).to.equal(
        true
      );
    });
    it("Entity 1 is now verified user", async () => {
      await Contract.registerEntity(entity1.address);
      expect(await Contract.isAccountVerified(entity1.address)).to.equal(true);
    });
    it("Owner can not register Entity 1 again", async () => {
      await Contract.registerEntity(entity1.address);
      await expect(Contract.registerEntity(entity1.address)).to.be.revertedWith(
        "This account already have this role"
      );
    });
    it("The Owner can not register as a Entity", async () => {
      await expect(Contract.registerEntity(owner.address)).to.be.revertedWith(
        "Owner account can not execute this operation"
      );
    });
  });

  describe("Admin assign patients to providers", () => {
    it("Only admin can assign patient to doctor", async () => {
      await expect(
        Contract.assignPatientToDoctor(patient1.address, provider1.address)
      ).to.be.revertedWith(
        `AccessControl: account ${owner.address
          .toString()
          .toLowerCase()} is missing role ${ADMIN_ROLE.toString().toLowerCase()}`
      );
    });

    it("Only registered and verified provider can be assigned patients", async () => {
      await Contract.registerAdmin(admin1.address);
      await expect(
        Contract.connect(admin1).assignPatientToDoctor(
          patient1.address,
          provider1.address
        )
      ).to.be.revertedWith("This account must be a registered provider");
    });

    it("Only registered patient can be assigned to provider", async () => {
      await Contract.registerAdmin(admin1.address);
      await Contract.registerProvider(provider1.address);
      await expect(
        Contract.connect(admin1).assignPatientToDoctor(
          patient1.address,
          provider1.address
        )
      ).to.be.revertedWith("This account must be a registered patient");
    });

    it("Admin successfully assigned a registered patient to a verified provider", async () => {
      await Contract.registerAdmin(admin1.address);
      await Contract.registerProvider(provider1.address);
      await Contract.registerPatient(patient1.address);
      await expect(
        Contract.connect(admin1).assignPatientToDoctor(
          patient1.address,
          provider1.address
        )
      ).not.revertedWith("");
    });
  });

  describe("Admin unassign assigned patients", () => {
    it("Successfully unassigned assigned patients", async () => {
      await Contract.registerAdmin(admin1.address);
      await Contract.registerProvider(provider1.address);
      await Contract.registerPatient(patient1.address);
      await Contract.registerPatient(patient2.address);

      // Assign patients
      await Contract.connect(admin1).assignPatientToDoctor(
        patient1.address,
        provider1.address
      );
      await Contract.connect(admin1).assignPatientToDoctor(
        patient2.address,
        provider1.address
      );
      console.log(await Contract.connect(provider1).getAssignedPatients());

      // Unassign them
      await Contract.connect(admin1).unAssignPatientFromDoctor(
        patient1.address,
        provider1.address
      );
      await Contract.connect(admin1).unAssignPatientFromDoctor(
        patient2.address,
        provider1.address
      );
      let zeroAddress = "0x0000000000000000000000000000000000000000";
      console.log(await Contract.connect(provider1).getAssignedPatients());
      expect(await Contract.connect(provider1).getAssignedPatients()).to.eql([
        zeroAddress,
        zeroAddress,
      ]);
    });
  });

  describe("Provider retrieving assigned patients", () => {
    it("Only verified provider can query assigned patients", async () => {
      await expect(Contract.getAssignedPatients()).to.be.revertedWith(
        `AccessControl: account ${owner.address
          .toString()
          .toLowerCase()} is missing role ${PROVIDER_ROLE.toString().toLowerCase()}`
      );
    });

    it("Provider successfully query assigned patients", async () => {
      await Contract.registerAdmin(admin1.address);
      await Contract.registerProvider(provider1.address);
      await Contract.registerPatient(patient1.address);
      await Contract.registerPatient(patient2.address);
      await Contract.connect(admin1).assignPatientToDoctor(
        patient1.address,
        provider1.address
      );
      await Contract.connect(admin1).assignPatientToDoctor(
        patient2.address,
        provider1.address
      );

      // console.log([patient1.address, patient2.address]);
      // console.log(await Contract.connect(provider1).getAssignedPatients());

      expect(await Contract.connect(provider1).getAssignedPatients()).to.eql([
        patient1.address,
        patient2.address,
      ]);
    });
  });

  describe("Patient viewing own records", () => {
    it("Only a registered patient can view own records", async () => {
      await expect(Contract.viewOwnRecords()).to.be.revertedWith(
        `AccessControl: account ${owner.address
          .toString()
          .toLowerCase()} is missing role ${PATIENT_ROLE.toString().toLowerCase()}`
      );
    });

    it("Patient view own records successfully", async () => {
      await Contract.registerPatient(patient1.address);
      expect(await Contract.connect(patient1).viewOwnRecords()).to.eql([
        [],
        "",
        "",
      ]);
    });
  });
});
