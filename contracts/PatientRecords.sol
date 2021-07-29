//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "hardhat/console.sol";

contract PatientRecords is Ownable, AccessControl {



    // State Variables are stored on the blockchain
    uint public creationTime = block.timestamp;

    bytes32 public constant PATIENT_ROLE    = keccak256("PATIENT_ROLE");

    bytes32 public constant ADMIN_ROLE      = keccak256("ADMIN_ROLE");
    bytes32 public constant PROVIDER_ROLE   = keccak256("PROVIDER_ROLE");
    bytes32 public constant ENTITY_ROLE     = keccak256("ENTITY_ROLE");

    
    
    struct EHrecord {
        string hash; // ""
        address doctorAccount; // 0x0000000000000000000000000000000000000000
    }

    struct PatientData {
        EHrecord[] patientRecords;
        string firstNameHash; // ""
        string lastNameHash; // ""
    }

    struct AssignedPatients {
        address[] patients;
        mapping(address => bool) exists;
        mapping(address => uint) patientIndex;
        uint counter;
    }

    
    mapping(address => bool) private isVerified;
    mapping(address => AssignedPatients) private doctorAssignedPatients;
    mapping(address => PatientData) private patientData;

    // Modifiers 
    // TODO: Is there a way to check if address is valid?
    modifier notOwner(address _account)  {
        require(_account != msg.sender, "Owner account can not execute this operation");
        _;
    }
    modifier onlyNew(bytes32 role, address _account) {
        require(!hasRole(role, _account), "This account already have this role");
        _;
    }
    modifier onlyVerifiedProvider(address _account) {
        require(hasRole(PROVIDER_ROLE, _account), "This account must be a registered provider");
        require(isAccountVerified(_account) == true, "This account must be verified");
        _;
    }
    modifier onlyRegisteredPatient(address _account) {
        require(hasRole(PATIENT_ROLE,  _account), "This account must be a registered patient");
        _;
    }
    

    // Contract Deployer Owner (Admin)
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

   

    // ------------- Anyone --------------------------
    // Anyone can check if a user is verified or not
    function isAccountVerified(address _account) public view 
        returns (bool) {
        return isVerified[_account];
    }

    function registerPatient(address _account) external onlyNew(PATIENT_ROLE, _account) {
        // 1. ✅  ensure that is new patient 
        _setupRole(PATIENT_ROLE, _account);
    }
    


    // ------------- Patient --------------------------
    function viewOwnRecords() external view
         onlyRole(PATIENT_ROLE) returns (PatientData memory) { 

        return patientData[msg.sender];
    }

    // ------------- Owner --------------------------
    // Owner verifies a user after holder provides credentials
    // TODO verify User and only verified can register.

    // function verifyAccount(address _account) public 
    // onlyRole(DEFAULT_ADMIN_ROLE) onlyOwner notOwner(_account) {
    //     if(!isAccountVerified(_account)) {
    //         isVerified[_account] = true;
    //     } else {
    //         revert("This account is already verified");
    //     }
    // }

    // Owner Register a verified Admin
    function registerAdmin(address _account) external 
        onlyRole(DEFAULT_ADMIN_ROLE) onlyOwner
        notOwner(_account) 
        onlyNew(ADMIN_ROLE, _account) {

            // ✅ 1. can't register the owner itself  
            // ✅ 2. can't assign it to an account that is already admin
            _setupRole(ADMIN_ROLE, _account);
            isVerified[_account] = true;
    }

    // Owner Register a verified Provider
    function registerProvider(address _account) external
        onlyRole(DEFAULT_ADMIN_ROLE) onlyOwner
        notOwner(_account) 
        onlyNew(PROVIDER_ROLE, _account) {

            _setupRole(PROVIDER_ROLE, _account);
            isVerified[_account] = true;
    }

    //Owner Register a verifid Entity
    function registerEntity(address _account) external 
        onlyRole(DEFAULT_ADMIN_ROLE) onlyOwner
        notOwner(_account)
        onlyNew(ENTITY_ROLE, _account) {

            _setupRole(ENTITY_ROLE, _account);
            isVerified[_account] = true;
    }   

    
    // ------------- Admin --------------------------
    

    function assignPatientToDoctor(address _patient_addr, address _doctor_addr)
     external onlyRole(ADMIN_ROLE) 
     onlyVerifiedProvider(_doctor_addr) 
     onlyRegisteredPatient(_patient_addr)
     notOwner(_patient_addr) notOwner(_doctor_addr)
       {

            // 1. ✅ must be a registered patient
            // 2. ✅ must be a registered and verified doctor
            // 3. ✅ patient address is not owner and doctor address is not owner
            // 4. ✅ only assign a new patient once
            if(!doctorAssignedPatients[_doctor_addr].exists[_patient_addr]) {
                doctorAssignedPatients[_doctor_addr].patients.push(_patient_addr);
                doctorAssignedPatients[_doctor_addr].exists[_patient_addr] = true;
                
                doctorAssignedPatients[_doctor_addr].patientIndex[_patient_addr] = doctorAssignedPatients[_doctor_addr].counter++;
            }
            
    }

    function unAssignPatientFromDoctor(address _patient_addr, address _doctor_addr)
     external onlyRole(ADMIN_ROLE) 
     onlyVerifiedProvider(_doctor_addr) 
     onlyRegisteredPatient(_patient_addr)
     notOwner(_patient_addr) notOwner(_doctor_addr) {

         // 1. Must be assigned patient in order to unassign.
         if(doctorAssignedPatients[_doctor_addr].exists[_patient_addr]) {
                uint index = doctorAssignedPatients[_doctor_addr].patientIndex[_patient_addr];
                
                doctorAssignedPatients[_doctor_addr].exists[_patient_addr] = false;
            
                // remove the patient address from the list of addresses
                delete doctorAssignedPatients[_doctor_addr].patients[index];
                // remove the index mapping for this patient
                delete doctorAssignedPatients[_doctor_addr].patientIndex[_patient_addr];
                delete doctorAssignedPatients[_doctor_addr].exists[_patient_addr];
                doctorAssignedPatients[_doctor_addr].counter--;
            }
     }



    // ------------- Provider --------------------------
    function getAssignedPatients() external view onlyRole(PROVIDER_ROLE)
        onlyVerifiedProvider(msg.sender)
        returns (address[] memory patients) 
        {
            // 1. ✅ must be a registered provider
            // 2. ✅ must be a verified provider
            // 3. ✅ must not be the owner of a contract
            return doctorAssignedPatients[msg.sender].patients;
    }






}