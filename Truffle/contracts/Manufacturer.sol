pragma solidity ^0.4.22;
pragma experimental ABIEncoderV2;

contract Manufacturer {
    address owner;

    struct codeObj {
        uint status;
        string brand;
        string model;
        string description;
        string manufactuerName;
        string manufactuerLocation;
        string manufactuerTimestamp;
        string retailer;
        string[] customers;
    }

    struct retailerObj {
        string name;
        string location;
    }

    mapping (string => codeObj) codeArr;
    mapping (string => retailerObj) retailerArr;

    // Function to create a new code for the product
    function createCode(string _code, string _brand, string _model, uint _status, string _description, string _manufactuerName, string _manufactuerLocation, string _manufactuerTimestamp) public payable returns (uint) {
        codeObj newCode;
        newCode.brand = _brand;
        newCode.model = _model;
        newCode.status = _status;
        newCode.description = _description;
        newCode.manufactuerName = _manufactuerName;
        newCode.manufactuerLocation = _manufactuerLocation;
        newCode.manufactuerTimestamp = _manufactuerTimestamp;
        codeArr[_code] = newCode;
        return 1;
    }

    // Function for showing product details if the person scanning the product is not the owner
    function getNotOwnedCodeDetails(string _code) public view returns (string, string, uint, string, string, string, string) {
        return (codeArr[_code].brand, codeArr[_code].model, codeArr[_code].status, codeArr[_code].description, codeArr[_code].manufactuerName, codeArr[_code].manufactuerLocation, codeArr[_code].manufactuerTimestamp);
    }

    // Function for showing product details if the person scanning the product is the owner
    function getOwnedCodeDetails(string _code) public view returns (string, string) {
        return (retailerArr[codeArr[_code].retailer].name, retailerArr[codeArr[_code].retailer].location);
    }

    function getCodeDetails(string _code) public view returns (string, string, uint, string, string, string, string) {
        return (codeArr[_code].brand, codeArr[_code].model, codeArr[_code].status, codeArr[_code].description, codeArr[_code].manufactuerName, codeArr[_code].manufactuerLocation, codeArr[_code].manufactuerTimestamp);
    }

    // Function for creating a new retailer
    function addRetailerToCode(string _code, string _hashedEmailRetailer) public payable returns (uint) {
        codeArr[_code].retailer = _hashedEmailRetailer;
        return 1;
    }

    function createRetailer(string _hashedEmail, string _retailerName, string _retailerLocation) public payable returns (uint) {
        retailerObj newRetailer;
        newRetailer.name = _retailerName;
        newRetailer.location = _retailerLocation;
        retailerArr[_hashedEmail] = newRetailer;
        return 1;
    }

    function getRetailerDetails(string _code) public view returns (string, string) {
        return (retailerArr[_code].name, retailerArr[_code].location);
    }

    // Cannot directly compare strings in Solidity
    // This function hashes the 2 strings and then compares the 2 hashes
    function compareStrings(string a, string b) internal returns (bool) {
    	return keccak256(a) == keccak256(b);
    }

    // Function to delete an element from an array
    function remove(uint index, string[] storage array) internal returns(bool) {
        if (index >= array.length)
            return false;

        for (uint i = index; i < array.length-1; i++) {
            array[i] = array[i+1];
        }
        delete array[array.length-1];
        array.length--;
        return true;
    }
}