//********************************* Entries for testing on remix*************************************
// registerProduct      "11", "Nike", "Jordan", 0, "It's costly", "Pratibha Co.", "Mumbai", "11:00"
//                      "22", "Adidas", "Predator", 0, "It's limited", "Singh and sons ltd.",  "Ludhiana", "12:00"
//                      "33", "Asics", "GT-20009", 0, "It's limited", "SSIPL.", "Haryana", "12:00"
// registerCustomer:     "81bd53649936d1e82c64ed216d9d7490", "Trevor","9999999999"
//                      "1c29fb983dbe92474a199631dca38fc6", "Edwin", "6936666666"
//                      "81bd53649936d1e74a199631dc9d7490", "Gregory", "8881922878"
//                      "1c29fb983dbe92482c64ed216d938fc6", "Aaditee", "7986543210"
// registerSeller:      "1111", "Lifestyle", "Chembur"
// addSellerToCode:   "11", "67xasdbsdfshjd89724hjdsf


pragma solidity >=0.4.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Manager {

    address owner;

    // structure creation for product, customer and seller

    struct Product {
        uint status;
        string brand;
        string model;
        string description;
        string manufactuerName;
        string manufactuerLocation;
        string manufactuerTimestamp;
        string seller;
        string[] customers;
    }


    struct customer {
        string name;
        string phone;
        string[] code; // list of products owned by the customer
        bool isValue;
    }

    struct seller {
        string name;
        string location;
    }

    struct manufact {
        string name;
        string location;
    }

    // mappings to the structures product, customer and seller

    mapping (string => Product) productArr;
    mapping (string => customer) customerArr;
    mapping (string => seller) sellerArr;
    mapping (string => manufact) manufactArr;

    // funtion to register product and create code
    function registerProduct(string _code, string _brand, string _model,uint _status, string _description, string _manufactuerName, string _manufactuerLocation, string _manufactuerTimestamp) public  returns (uint) {
        Product newCode;
        newCode.brand = _brand;
        newCode.model = _model;
        newCode.status = _status;
        newCode.description = _description;
        newCode.manufactuerName = _manufactuerName;
        newCode.manufactuerLocation = _manufactuerLocation;
        newCode.manufactuerTimestamp = _manufactuerTimestamp;
        productArr[_code] = newCode;
        return 1;
    }

     // funtion to register customer

    function registerCustomer(string _hashedEmail, string _name, string _phone) public payable returns (bool) {
        if (customerArr[_hashedEmail].isValue) {
            return false;
        }
        customer newCustomer;
        newCustomer.name = _name;
        newCustomer.phone = _phone;
        newCustomer.isValue = true;
        customerArr[_hashedEmail] = newCustomer;
        return true;
    }
    
    // funtion to register seller

    function registerSeller(string _hashedEmail, string _sellerName,string _sellerLocation) public payable returns (uint){
        seller newSeller;
        newSeller.name          = _sellerName;
        newSeller.location      = _sellerLocation;
        sellerArr[_hashedEmail] = newSeller;
        return 1;
    }

    function registerManufact(string _hashedEmail, string _manufactName,string _manufactLocation) public payable returns (uint){
        manufact newManufact;
        newManufact.name          = _manufactName;
        newManufact.location      = _manufactLocation;
        manufactArr[_hashedEmail] = newManufact;
        return 1;
    }


    // function to retrieve customer details

    function getCustomerDetails(string _code) public view returns (string, string) {
        return (customerArr[_code].name, customerArr[_code].phone);
    }

    // function to retrieve seller details

    function getSellerDetails(string _code) public view returns (string, string) {
        return (sellerArr[_code].name, sellerArr[_code].location);
    }

    // function to retrieve manufacturer details
    function getManufactDetails(string _code) public view returns (string, string) {
        return (manufactArr[_code].name, manufactArr[_code].location);
    }

    // Function for showing product details if the person scanning the product is not the owner
    function getNotOwnedCodeDetails(string _code) public view returns (string, string, uint, string, string, string, string) {
        return (productArr[_code].brand, productArr[_code].model, productArr[_code].status, productArr[_code].description, productArr[_code].manufactuerName, productArr[_code].manufactuerLocation, productArr[_code].manufactuerTimestamp);
    }

    // Function for showing product details if the person scanning the product is the owner
    function getOwnedCodeDetails(string _code) public view returns (string, string) {
        return (sellerArr[productArr[_code].seller].name, sellerArr[productArr[_code].seller].location);
    }
    
   // Given a customer returns all the product codes he owwns
    function getCodes(string _customer) public view returns(string[]) {
        return customerArr[_customer].code;
    }


    // Function for creating a new seller
    function addSellerToCode(string _code, string _hashedEmailseller) public payable returns (uint) {
        productArr[_code].seller = _hashedEmailseller;
        return 1;
    }

    // Function to report stolen
    function reportStolen(string _code, string _customer) public payable returns (bool) {
        uint i;
        // Checking if the customer exists
        if (customerArr[_customer].isValue) {
            // Checking if the customer owns the product
            for (i = 0; i < customerArr[_customer].code.length; i++) {
                if (compareStrings(customerArr[_customer].code[i], _code)) {
                    productArr[_code].status = 2;        // Changing the status to stolen
                }
                return true;
            }
        }
        return false;
    }

    function changeOwner(string _code, string _oldCustomer, string _newCustomer) public payable returns (bool) {
        uint i;
        bool flag = false;
         //Creating objects for code,oldCustomer,newCustomer
        Product memory product = productArr[_code];
        uint len_product_customer = product.customers.length;
        customer memory oldCustomer = customerArr[_oldCustomer];
        uint len_oldCustomer_code = customerArr[_oldCustomer].code.length;
        customer memory newCustomer = customerArr[_newCustomer];

        //Check if oldCustomer and newCustomer have an account
        if (oldCustomer.isValue && newCustomer.isValue) {
            //Check if oldCustomer is owner
            for (i = 0; i < len_oldCustomer_code; i++) {
                if (compareStrings(oldCustomer.code[i], _code)) {
                    flag = true;
                    break;
                }
            }

            if (flag == true) {
                //Swaping oldCustomer with newCustomer in product
                for (i = 0; i < len_product_customer; i++) {
                    if (compareStrings(product.customers[i], _oldCustomer)) {
                        productArr[_code].customers[i] = _newCustomer;
                        break;
                    }
                }

                // Removing product from oldCustomer
                for (i = 0; i < len_oldCustomer_code; i++) {
                    if (compareStrings(customerArr[_oldCustomer].code[i], _code)) {
                        remove(i, customerArr[_oldCustomer].code);
                        // Adding product to newCustomer
                        uint len = customerArr[_newCustomer].code.length;
                        if(len == 0){
                            customerArr[_newCustomer].code.push(_code);
                            customerArr[_newCustomer].code.push("hack");
                        } else {
                            customerArr[_newCustomer].code[len-1] = _code;
                            customerArr[_newCustomer].code.push("hack");
                        }
                        return true;
                    }
                }
            }
        }
        return false;
    }


    function initialOwner(string _code, string _seller, string _customer) public payable returns(bool) {
            uint i;
            if (compareStrings(productArr[_code].seller, _seller)) {       // Check if seller owns the prodct
                if (customerArr[_customer].isValue) {                       // Check if Customer has an account
                    productArr[_code].customers.push(_customer);               // Adding customer in code
                    productArr[_code].status = 1;
                    uint len = customerArr[_customer].code.length;
                    if(len == 0) {
                        customerArr[_customer].code.push(_code);
                        // customerArr[_customer].code.push("hack");
                    } else {
                    customerArr[_customer].code[len-1] = _code;
                    // customerArr[_customer].code.push("hack");
                    }
                    return true;
                }
            }
            return false;
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

    // Function to convert string to bytes32
    function stringToBytes32(string memory source) internal returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }
}