//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
// import "@openzeppelin/contracts/access/Roles.sol";

import "hardhat/console.sol";

contract PatientRecords is Ownable, AccessControl {

    bytes32 public constant PATIENT_ROLE    = keccak256("PATIENT_ROLE");
    bytes32 public constant PROVIDER_ROLE   = keccak256("PROVIDER_ROLE");
    bytes32 public constant ENTITY_ROLE     = keccak256("PROVIDER_ROLE");
    bytes32 public constant ADMIN_ROLE      = keccak256("ADMIN_ROLE");

    struct HealthRecords {
        string[] recordsHashes;
        
        mapping(address => bool) CreatePermission;
        mapping(address => bool) ReadPermission;
        mapping(address => bool) UpdatePermission;  
        mapping(address => bool) DeletePermission;
        mapping(address => string[]) sharedRecords;
    }

    mapping(address => HealthRecords) private EHRecords;

    function isPatient(address _account) private view returns (bool) {
        return hasRole(PATIENT_ROLE, _account);
    }
    
    // Contract Deployer Owner (Admin)
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
  
    function registerAdmin(address _account) external 
        onlyRole(DEFAULT_ADMIN_ROLE) onlyOwner {
             require(!hasRole(ADMIN_ROLE, _account), "This account already has admin role");
            _setupRole(ADMIN_ROLE, _account);
    }


    // Admin Role
    function registerPatient(address _account) external
        onlyRole(ADMIN_ROLE)  {
            require(!hasRole(PATIENT_ROLE, _account), "This account already has patient role");
            // require(!hasRole(PROVIDER_ROLE, _account), "This account cannot have provider role");
            // require(!hasRole(ADMIN_ROLE, _account), "This account cannot have a admin role");
            // require(!hasRole(ENTITY_ROLE, _account), "This account cannot have a entity role");

            _setupRole(PATIENT_ROLE, _account);
            _setRoleAdmin(PATIENT_ROLE, ADMIN_ROLE);
    }

    function registerProvider(address _account) external
        onlyRole(ADMIN_ROLE)  {

            require(!hasRole(PROVIDER_ROLE, _account), "This account already has provider role");
            // require(!hasRole(PATIENT_ROLE, _account), "This account cannot have a patient role");
            // require(!hasRole(ADMIN_ROLE, _account), "This account cannot have a admin role");
            // require(!hasRole(ENTITY_ROLE, _account), "This account cannot have a entity role");

            _setupRole(PROVIDER_ROLE, _account);
            _setRoleAdmin(PROVIDER_ROLE, ADMIN_ROLE);
    }

    function registerEntity(address _account) external
        onlyRole(ADMIN_ROLE)  {
            require(!hasRole(ENTITY_ROLE, _account), "This account already has entity role");
            // require(!hasRole(PATIENT_ROLE, _account), "This account cannot have a patient role");
            // require(!hasRole(ADMIN_ROLE, _account), "This account cannot have a admin role");
            // require(!hasRole(PROVIDER_ROLE, _account), "This account already has provider role");
            _setupRole(ENTITY_ROLE, _account);
            _setRoleAdmin(ENTITY_ROLE, ADMIN_ROLE);
    }



    // Patient Role
    function grantCreateePermission(address _address) public onlyRole(PATIENT_ROLE) {
        if(!isPatient(_address)) {
            require(EHRecords[msg.sender].CreatePermission[_address] == false, "This account already has create permission");
            EHRecords[msg.sender].CreatePermission[_address] = true;
        }
    }
    function grantReadPermission(address _address) public onlyRole(PATIENT_ROLE) {
        if(!isPatient(_address)) {
            require(EHRecords[msg.sender].ReadPermission[_address] == false, "This account already has read permission");
            EHRecords[msg.sender].ReadPermission[_address] = true;
        }
    }
    // function grantUpdatePermission(address _address) public onlyRole(PATIENT_ROLE) {
    //     if(!isPatient(_address)) {
    //         require(EHRecords[msg.sender].UpdatePermission[_address] == false, "This account already has update permission");
    //         EHRecords[msg.sender].UpdatePermission[_address] = true;
    //     }
    // }
    function grantDeletePermission(address _address) public onlyRole(PATIENT_ROLE) {
        if(!isPatient(_address)) {
            require(EHRecords[msg.sender].DeletePermission[_address] == false, "This account already has delete permission");
            EHRecords[msg.sender].DeletePermission[_address] = true;
        }
    }
    function revokeAccess(address _address) public onlyRole(PATIENT_ROLE) {
        if(!isPatient(_address)) {
            EHRecords[msg.sender].CreatePermission[_address] = false;
            EHRecords[msg.sender].ReadPermission[_address] = false;
            EHRecords[msg.sender].UpdatePermission[_address] = false;
            EHRecords[msg.sender].DeletePermission[_address] = false;
        }
    }

    function shareRecord(address _address, string memory records) public onlyRole(PATIENT_ROLE) {
        grantReadPermission(_address);
        EHRecords[_address].sharedRecords[_address].push(records);
    }

    



    // Patient 

    function patientReadHealthRecords() public view 
        onlyRole(PATIENT_ROLE) 
        returns (string[] memory records) 
        {
         return EHRecords[msg.sender].recordsHashes;
    }

    // Provider

    function providerCreteHealthRecord(address _account, string memory hash) public 
        onlyRole(PROVIDER_ROLE) {
        if(isPatient(_account)) {
            require(EHRecords[_account].CreatePermission[msg.sender] == true, "You dont have create permission");
            EHRecords[_account].recordsHashes.push(hash);
        }
    }

    function providerReadHealthRecords(address _account) public view 
        onlyRole(PROVIDER_ROLE) 
        returns (string[] memory records)  
        {
        if(isPatient(_account)) {
                require(EHRecords[_account].ReadPermission[msg.sender] == true, "You Dont have read permissions");
                return EHRecords[_account].recordsHashes;
            }
    }

    function providerDeleteHealthRecord(address _account, string memory hash) public onlyRole(PROVIDER_ROLE) {
        if(isPatient(_account)) {
             require(EHRecords[_account].DeletePermission[msg.sender] == true, "You Dont have delete permissions");
             for(uint i=0; i<EHRecords[_account].recordsHashes.length; i++) {
                 if( keccak256(bytes(EHRecords[_account].recordsHashes[i])) == keccak256(bytes(hash))) {
                     delete EHRecords[_account].recordsHashes[i];
                 }
             }
        }
    }


    
    // Entity
    function entityReadHealthRecords(address _account) public view 
        onlyRole(ENTITY_ROLE) 
        returns (string[] memory records)   
        {
        if(isPatient(_account)) {
            require(EHRecords[_account].ReadPermission[msg.sender] == true, "You Dont have read permissions");
            return EHRecords[_account].sharedRecords[msg.sender];
        }
    }





    




}