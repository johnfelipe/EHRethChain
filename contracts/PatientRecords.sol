//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "hardhat/console.sol";

contract PatientRecords is Ownable, AccessControl {
   
    bytes32 public constant ADMIN_ROLE      = keccak256("ADMIN_ROLE");
    bytes32 public constant PROVIDER_ROLE   = keccak256("PROVIDER_ROLE");
  
    struct Admin {
        string hospital;
        bool isVerified;
    }

    struct Provider {
        address account;
        string hospital;
        bool isVerified;
    }

    struct AssignedPatients {
        address[] patients;
        mapping(address => bool) exists;
        mapping(address => uint) patientIndex;
        uint counter;
    }

    struct Access {
        address ownerAccount;
        string accessGrant;
        string[] objects;
    }
   
    mapping(address => Admin) private admins;
    mapping(address => Provider) private providers;
    mapping(string => Provider[]) private hospitalToProviders;
    mapping(address => AssignedPatients) private providerAssignedPatients;

    mapping(address => Access[]) private sharedData; 

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // ---- Owner ----

    
    function registerAdmin(address _account, string memory _hospital) external 
        onlyRole(DEFAULT_ADMIN_ROLE) onlyOwner {
            
            _setupRole(ADMIN_ROLE, _account);
           
            Admin memory newAdmin = Admin(_hospital, true);
            admins[_account] = newAdmin;

    }

    function registerProvider(address _account, string memory _hospital) external
        onlyRole(DEFAULT_ADMIN_ROLE) onlyOwner {
            
            _setupRole(PROVIDER_ROLE, _account);

            Provider memory newProvider = Provider(_account, _hospital, true);
            providers[_account] = newProvider;

            hospitalToProviders[_hospital].push(newProvider);
    }
    
    // --- Admin ---
    
    function getProviders() external 
        onlyRole(ADMIN_ROLE) view returns (Provider[] memory) {

            Admin memory admin = admins[msg.sender];
            return hospitalToProviders[admin.hospital];
    }

    function getProviderAssignedPatients(address _provider) external
        onlyRole(ADMIN_ROLE) view returns (address[] memory) {

            return providerAssignedPatients[_provider].patients;
    }

    function assignPatientToProvider(address _provider, address _patient) external 
        onlyRole(ADMIN_ROLE) {

            providerAssignedPatients[_provider].patients.push(_patient);
            providerAssignedPatients[_provider].exists[_patient] = true;
            providerAssignedPatients[_provider].patientIndex[_patient] = providerAssignedPatients[_provider].counter++;
    }

    function unassignPatientFromProvider(address _provider, address _patient) external 
        onlyRole(ADMIN_ROLE) {

            uint index = providerAssignedPatients[_provider].patientIndex[_patient];
            delete providerAssignedPatients[_provider].patients[index];
            delete providerAssignedPatients[_provider].patientIndex[_patient];
            providerAssignedPatients[_provider].exists[_patient] = false;
            providerAssignedPatients[_provider].counter--;
    }

    function getProviderGrantedAccess(address _provider) external 
        onlyRole(ADMIN_ROLE) view returns (Access[] memory) {
            return sharedData[_provider];
    }

    
    
}