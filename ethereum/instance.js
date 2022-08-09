import web3 from './web3';

const address = '0x4e01b0A0b516ea4C1A490C3A9bFbCfe6EA340979';
const abi =  [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_code",
        "type": "string"
      },
      {
        "name": "_brand",
        "type": "string"
      },
      {
        "name": "_model",
        "type": "string"
      },
      {
        "name": "_status",
        "type": "uint256"
      },
      {
        "name": "_description",
        "type": "string"
      },
      {
        "name": "_manufactuerName",
        "type": "string"
      },
      {
        "name": "_manufactuerLocation",
        "type": "string"
      },
      {
        "name": "_manufactuerTimestamp",
        "type": "string"
      }
    ],
    "name": "createCode",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_code",
        "type": "string"
      }
    ],
    "name": "getNotOwnedCodeDetails",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_code",
        "type": "string"
      }
    ],
    "name": "getOwnedCodeDetails",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_code",
        "type": "string"
      }
    ],
    "name": "getCodeDetails",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_code",
        "type": "string"
      },
      {
        "name": "_hashedEmailRetailer",
        "type": "string"
      }
    ],
    "name": "addRetailerToCode",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_hashedEmail",
        "type": "string"
      },
      {
        "name": "_retailerName",
        "type": "string"
      },
      {
        "name": "_retailerLocation",
        "type": "string"
      }
    ],
    "name": "createRetailer",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_code",
        "type": "string"
      }
    ],
    "name": "getRetailerDetails",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

export default new web3.eth.Contract(abi, address);
