const { expect } = require("chai");

describe("Patient Records Contract", () => {
  let Contract;

  let owner;
  let admin;

  let patient1;
  let patient2;
  let provider1;
  let provider2;
  let entity1;
  let entity2;

  let ADMIN_ROLE;
  let PATIENT_ROLE;
  let ENTITY_ROLE;
  let DEFAULT_ADMIN_ROLE;

  beforeEach(async () => {
    PatientRecords = await ethers.getContractFactory("PatientRecords");
    [owner, admin, patient1, patient2, provider1, provider2, entity1, entity2] =
      await ethers.getSigners();
    Contract = await PatientRecords.deploy();
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      console.log("     Owner Address: ", owner.address);
      expect(await Contract.owner()).to.equal(owner.address);
    });
  });

  describe("Accounts", () => {
    it("Should display the accounts", () => {
      console.log("     Contract Deployer Owner Admin   : ", owner.);
      console.log("     Admin                           : ", admin.address);
      console.log("     Patient 1                       : ", patient1.address);
      console.log("     Patient 2                       : ", patient2.address);
      console.log("     Provider 1                      : ", provider1.address);
      console.log("     Provider 2                      : ", provider2.address);
      console.log("     Entity 1                        : ", entity1.address);
      console.log("     Entity 2                        : ", entity2.address);
    });
    it("Should display the accounts balances", () => {
      console.log("     Contract Deployer Owner Admin   : ", owner.balance);
    });
  });

  describe("Roles", () => {
    it("Should display the roles", async () => {
      ADMIN_ROLE = await Contract.ADMIN_ROLE();
      PATIENT_ROLE = await Contract.PATIENT_ROLE();
      PROVIDER_ROLE = await Contract.PROVIDER_ROLE();
      ENTITY_ROLE = await Contract.ENTITY_ROLE();
      DEFAULT_ADMIN_ROLE = await Contract.DEFAULT_ADMIN_ROLE();
      console.log("     ADMIN_ROLE                  : ", ADMIN_ROLE);
      console.log("     PATIENT_ROLE                : ", PATIENT_ROLE);
      console.log("     PROVIDER_ROLE               : ", PROVIDER_ROLE);
      console.log("     ENTITY_ROLE                 : ", ENTITY_ROLE);
      console.log("     DEFAULT_ADMIN_ROLE          : ", DEFAULT_ADMIN_ROLE);
    });
  });

  describe("Users Roles", () => {
    describe("Owner Roles", () => {
      it("Owner role is DEFAULT_ADMIN_ROLE", async () => {
        expect(
          await Contract.hasRole(DEFAULT_ADMIN_ROLE, owner.address)
        ).to.equal(true);
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
      it("Owner role is not ADMIN_ROLE", async () => {
        expect(await Contract.hasRole(ADMIN_ROLE, owner.address)).to.equal(
          false
        );
      });
    });

    describe("Patient Roles", () => {
      it("Patient 1 role is Not PATIENT_ROLE", async () => {
        expect(await Contract.hasRole(PATIENT_ROLE, patient1.address)).to.equal(
          false
        );
      });

      it("Patient 1 role is PATIENT_ROLE", async () => {
        await Contract.registerAdmin(admin.address);
        await Contract.connect(admin).registerPatient(patient1.address);
        expect(await Contract.hasRole(PATIENT_ROLE, patient1.address)).to.equal(
          true
        );
      });

      //   it("Patient 1 role is PATIENT_ROLE and cannot become a Provider ", async () => {
      //     await Contract.registerAdmin(admin.address);
      //     await Contract.connect(admin).registerPatient(patient1.address);
      //     await expect(
      //       Contract.connect(admin).registerProvider(patient1.address)
      //     ).to.be.revertedWith("This account cannot have a patient role");
      //   });

      //   it("Patient 1 role is PATIENT_ROLE and cannot become an Entity ", async () => {
      //     await Contract.registerAdmin(admin.address);
      //     await Contract.connect(admin).registerPatient(patient1.address);
      //     await expect(
      //       Contract.connect(admin).registerEntity(patient1.address)
      //     ).to.be.revertedWith("This account cannot have a patient role");
      //   });

      it("Patient 1 role is not PROVIDER_ROLE", async () => {
        expect(
          await Contract.hasRole(PROVIDER_ROLE, patient1.address)
        ).to.equal(false);
      });

      it("Patient 1 role is not ENTITY_ROLE", async () => {
        expect(await Contract.hasRole(ENTITY_ROLE, patient1.address)).to.equal(
          false
        );
      });

      it("Patient 1 role is not ADMIN_ROLE", async () => {
        expect(await Contract.hasRole(ADMIN_ROLE, patient1.address)).to.equal(
          false
        );
      });
    });

    describe("Provider Role", () => {
      it("Provider 1 role is Not PROVIDER_ROLE", async () => {
        expect(
          await Contract.hasRole(PROVIDER_ROLE, provider1.address)
        ).to.equal(false);
      });
      it("Provider 1 role is PROVIDER_ROLE", async () => {
        await Contract.registerAdmin(admin.address);
        await Contract.connect(admin).registerProvider(provider1.address);
        expect(
          await Contract.hasRole(PROVIDER_ROLE, provider1.address)
        ).to.equal(true);
      });
    });
  });

  describe("Get a Role's Admin", () => {
    describe("DEFAULT_ADMIN_ROLE ROLE Assertions", () => {
      it("DEFAULT_ADMIN_ROLE role Admin is DEFAULT_ADMIN_ROLE", async () => {
        expect(await Contract.getRoleAdmin(DEFAULT_ADMIN_ROLE)).to.equal(
          DEFAULT_ADMIN_ROLE
        );
      });
      it("DEFAULT_ADMIN_ROLE role Admin is not PATIENT_ROLE", async () => {
        expect(await Contract.getRoleAdmin(DEFAULT_ADMIN_ROLE)).not.to.equal(
          PATIENT_ROLE
        );
      });
      it("DEFAULT_ADMIN_ROLE role Admin is not PROVIDER_ROLE", async () => {
        expect(await Contract.getRoleAdmin(DEFAULT_ADMIN_ROLE)).not.to.equal(
          PROVIDER_ROLE
        );
      });
      it("DEFAULT_ADMIN_ROLE role Admin is not ENTITY_ROLE", async () => {
        expect(await Contract.getRoleAdmin(DEFAULT_ADMIN_ROLE)).not.to.equal(
          ENTITY_ROLE
        );
      });
      it("DEFAULT_ADMIN_ROLE role Admin is not ADMIN_ROLE", async () => {
        expect(await Contract.getRoleAdmin(DEFAULT_ADMIN_ROLE)).not.to.equal(
          ADMIN_ROLE
        );
      });
    });

    describe("ADMIN_ROLE Assertions", () => {
      it("ADMIN_ROLE role Admin is DEFAULT_ADMIN_ROLE", async () => {
        expect(await Contract.getRoleAdmin(ADMIN_ROLE)).to.equal(
          DEFAULT_ADMIN_ROLE
        );
      });
      it("ADMIN_ROLE role Admin is not PATIENT_ROLE", async () => {
        expect(await Contract.getRoleAdmin(ADMIN_ROLE)).not.to.equal(
          PATIENT_ROLE
        );
      });
      it("ADMIN_ROLE role Admin is not PROVIDER_ROLE", async () => {
        expect(await Contract.getRoleAdmin(ADMIN_ROLE)).not.to.equal(
          PROVIDER_ROLE
        );
      });
      it("ADMIN_ROLE role Admin is not ENTITY_ROLE", async () => {
        expect(await Contract.getRoleAdmin(ADMIN_ROLE)).not.to.equal(
          ENTITY_ROLE
        );
      });
      it("ADMIN_ROLE role Admin is not ADMIN_ROLE", async () => {
        expect(await Contract.getRoleAdmin(ADMIN_ROLE)).not.to.equal(
          ADMIN_ROLE
        );
      });
    });

    describe("PATIENT_ROLE Assertions", () => {
      it("PATIENT_ROLE role Admin is DEFAULT_ADMIN_ROLE", async () => {
        expect(await Contract.getRoleAdmin(PATIENT_ROLE)).to.equal(
          DEFAULT_ADMIN_ROLE
        );
      });
      it("PATIENT_ROLE role Admin initially is not ADMIN_ROLE", async () => {
        expect(await Contract.getRoleAdmin(PATIENT_ROLE)).not.to.equal(
          ADMIN_ROLE
        );
      });
      it("PATIENT_ROLE role Admin is ADMIN_ROLE and no longer is DEFAULT_ADMIN_ROLE ", async () => {
        await Contract.registerAdmin(admin.address); // Owner register an admin
        await Contract.connect(admin).registerPatient(patient1.address); // Admin Register a Patient
        expect(await Contract.getRoleAdmin(PATIENT_ROLE)).to.equal(ADMIN_ROLE);
        expect(await Contract.getRoleAdmin(PATIENT_ROLE)).not.to.equal(
          DEFAULT_ADMIN_ROLE
        );
      });
      it("PATIENT_ROLE role Admin is not PATIENT_ROLE", async () => {
        expect(await Contract.getRoleAdmin(PATIENT_ROLE)).not.to.equal(
          PATIENT_ROLE
        );
      });
      it("PATIENT_ROLE role Admin is not PROVIDER_ROLE", async () => {
        expect(await Contract.getRoleAdmin(PATIENT_ROLE)).not.to.equal(
          PROVIDER_ROLE
        );
      });
      it("PATIENT_ROLE role Admin is not ENTITY_ROLE", async () => {
        expect(await Contract.getRoleAdmin(PATIENT_ROLE)).not.to.equal(
          ENTITY_ROLE
        );
      });
    });

    describe("PROVIDER_ROLE Assertions", () => {
      it("PROVIDER_ROLE role Admin is DEFAULT_ADMIN_ROLE", async () => {
        expect(await Contract.getRoleAdmin(PROVIDER_ROLE)).to.equal(
          DEFAULT_ADMIN_ROLE
        );
      });
      it("PROVIDER_ROLE role Admin is initially not ADMIN_ROLE", async () => {
        expect(await Contract.getRoleAdmin(PROVIDER_ROLE)).not.to.equal(
          ADMIN_ROLE
        );
      });
      it("PROVIDER_ROLE role Admin is ADMIN_ROLE and no longer is DEFAULT_ADMIN_ROLE", async () => {
        await Contract.registerAdmin(admin.address);
        await Contract.connect(admin).registerProvider(provider1.address);
        expect(await Contract.getRoleAdmin(PROVIDER_ROLE)).to.equal(ADMIN_ROLE);
        expect(await Contract.getRoleAdmin(PROVIDER_ROLE)).not.to.equal(
          DEFAULT_ADMIN_ROLE
        );
      });
      it("PROVIDER_ROLE role Admin is not PROVIDER_ROLE", async () => {
        expect(await Contract.getRoleAdmin(PROVIDER_ROLE)).not.to.equal(
          PROVIDER_ROLE
        );
      });
      it("PROVIDER_ROLE role Admin is not ENTITY_ROLE", async () => {
        expect(await Contract.getRoleAdmin(PROVIDER_ROLE)).not.to.equal(
          ENTITY_ROLE
        );
      });
      it("PROVIDER_ROLE role Admin is not PATIENT_ROLE", async () => {
        expect(await Contract.getRoleAdmin(PROVIDER_ROLE)).not.to.equal(
          PATIENT_ROLE
        );
      });
    });

    describe("ENTITY_ROLE Assertions", () => {
      it("ENTITY_ROLE role Admin is DEFAULT_ADMIN_ROLE", async () => {
        expect(await Contract.getRoleAdmin(ENTITY_ROLE)).to.equal(
          DEFAULT_ADMIN_ROLE
        );
      });
      it("ENTITY_ROLE role Admin initially is not ADMIN_ROLE", async () => {
        expect(await Contract.getRoleAdmin(ENTITY_ROLE)).not.to.equal(
          ADMIN_ROLE
        );
      });
      it("ENTITY_ROLE role Admin is ADMIN_ROLE and no longer is DEFAULT_ADMIN_ROLE", async () => {
        await Contract.registerAdmin(admin.address);
        await Contract.connect(admin).registerEntity(entity1.address);
        expect(await Contract.getRoleAdmin(ENTITY_ROLE)).to.equal(ADMIN_ROLE);
        expect(await Contract.getRoleAdmin(ENTITY_ROLE)).not.to.equal(
          DEFAULT_ADMIN_ROLE
        );
      });
      it("ENTITY_ROLE role Admin is not ENTITY_ROLE", async () => {
        expect(await Contract.getRoleAdmin(ENTITY_ROLE)).not.to.equal(
          ENTITY_ROLE
        );
      });
      it("ENTITY_ROLE role Admin is not PATIENT_ROLE", async () => {
        expect(await Contract.getRoleAdmin(ENTITY_ROLE)).not.to.equal(
          PATIENT_ROLE
        );
      });
      it("ENTITY_ROLE role Admin is not PROVIDER_ROLE", async () => {
        expect(await Contract.getRoleAdmin(ENTITY_ROLE)).not.to.equal(
          PROVIDER_ROLE
        );
      });
    });
  });
});
