import React, {useState} from 'react';
import Head from 'next/head'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input ,
    FormHelperText,
    Button, ButtonGroup ,
    Spinner ,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
    Text
  } from '@chakra-ui/react'
import web3 from "../../ethereum/web3";
import instance from "../../ethereum/instance";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import Trev from '../components/Trev';
import Greg from '../components/greg';

export default function formProduct() {
    // 
    // let productCode='';
    let productStatus=0;
    let gg =0;
    const [productCode, setProductCode] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [description, setDescription] = useState("");
    const [manufactuerName, setManufactuerName] = useState("");
    const [manufactuerLocation, setManufactuerLocation] = useState("");
    const [manufactuerTimestamp, setManufactuerTimestamp] = useState("");
    // const [productStatus, setProductStatus] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [displayAlert, setDisplayAlert] = useState('none');


    
    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");
        const result = null;
     
        

    try {
      const accounts = await web3.eth.getAccounts();
      // console.log(emailAddress,name,phoneNumber);
      // productCode = Math.floor(Math.random() * 90 + 10).toString();
      await instance.methods
      .createCode(productCode,brand,model,productStatus,description,manufactuerName,manufactuerLocation,manufactuerTimestamp)
      .send({
        from: accounts[0]
      });
      // console.log(boolRes);
      result = await instance.methods
      .getNotOwnedCodeDetails(productCode)
      .call();
      console.log(JSON.stringify(result));
      console.log(typeof result);
    } catch (err) {
      setDisplayAlert('');
      setErrorMessage( err.message );
      console.log(err);
    }
    setLoading(false);
    
    const arr = ['Brand', 'Model', 'Status', 'Description', 'Manufacturer Name', 'Manufacturer Location','Manufacturer Timestamp'];
    const replaceKeys = (arr, obj) => {
    const keys = Object.keys(obj);
    const res = {};
    for(let a in arr){
      res[arr[a]] = obj[keys[a]];
      obj[arr[a]] = obj[keys[a]];
      delete obj[keys[a]];
      };
    };
    replaceKeys(arr, result);

    let str = JSON.stringify(result);
    str = JSON.stringify(result, null, 4); 
    console.log(str);
    ReactDOM.render(<QRCode value= {str} />, document.getElementById("qr_code"));
    }
    const onPrint = async (event) => {
      var content = document.getElementById("qr_code");
      var pri = document.getElementById("ifmcontentstoprint").contentWindow;
      pri.document.open();
      pri.document.write(content.innerHTML);
      pri.document.close();
      pri.focus();
      pri.print();
    }

  return(
    
  <div>
    
      <Head>
        <title>Product Registration</title>
        <meta name="title" content="Mini Project" />

      </Head>
      <Greg />
      <div align =  'center'>
      <Text fontSize="2xl" fontWeight="bold">Product Registration</Text>
      </div>
        <form onSubmit={onSubmit}>

            <FormControl  >
              <FormLabel> Product Code</FormLabel>
              <Input 
               value={productCode}
               onChange={(e) => setProductCode(e.target.value)}
              />
            </FormControl>

            <FormControl  >
              <FormLabel>Brand</FormLabel>
              <Input 
               value={brand}
               onChange={(e) => setBrand(e.target.value)}
              />
            </FormControl>

            <FormControl  >
              <FormLabel >Model</FormLabel>
              <Input  
              value={model}
              onChange={(e) => setModel(e.target.value)}
              />
            </FormControl>
        
            <FormControl  >
              <FormLabel>Description</FormLabel>
              <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl  >
              <FormLabel htmlFor='first-name'>Manufactuer Name</FormLabel>
              <Input 
               value={manufactuerName}
               onChange={(e) => setManufactuerName(e.target.value)}
              />
            </FormControl>

            <FormControl  >
              <FormLabel htmlFor='email'>Manufactuer Location</FormLabel>
              <Input 
              value={manufactuerLocation}
              onChange={(e) => setManufactuerLocation(e.target.value)}
              
              />
            </FormControl>
        
            <FormControl  >
              <FormLabel>Manufactuer Timestamp</FormLabel>
              <Input
              value={manufactuerTimestamp}
              onChange={(e) => setManufactuerTimestamp(e.target.value)}
              />
            </FormControl>

            <Alert status='error' display={displayAlert}>
              <AlertIcon />
              <AlertTitle mr={2}>"Oops!"</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>

            <Button type="submit" colorScheme='blue' isLoading = {loading} > Submit </Button>
            <br/><br/><br/><br/>
            <iframe id="ifmcontentstoprint" ></iframe>
            <div id="qr_code" align="center"  ><br/><br/>
            </div>
            <div>
            <br/>
            <Button colorScheme='blue' onClick={onPrint} > Print  QRCode </Button>
            <br/><br/><br/><br/>
            <Trev/>
            </div>
            
        </form>
  </div>
  );
}
