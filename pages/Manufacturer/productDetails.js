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
    Text,
    Center
  } from '@chakra-ui/react'
import web3 from "../../ethereum/web3";
import instance from "../../ethereum/instance";
import Greg from '../components/greg';
import Trev from '../components/Trev';

export default function productDetails() {
    // 
    // let productCode='';
    let productStatus=0;
    const [productCode, setProductCode] = useState("");
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
    //   await instance.methods
    //   .getCodeDetails(productCode)
    //   .send({
    //     from: accounts[0]
    //   });
      // console.log(boolRes);
      result = await instance.methods
      .getCodeDetails(productCode)
      .call();
    let value =  result ;
    document.getElementById("demo").innerHTML = value[0];
    document.getElementById("demo1").innerHTML = value[1];
    document.getElementById("demo2").innerHTML = value[2];
    document.getElementById("demo3").innerHTML = value[3];
    document.getElementById("demo4").innerHTML = value[4];
    document.getElementById("demo5").innerHTML = value[5];
    document.getElementById("demo6").innerHTML = value[6];
    // for (let i=0; i <value.length;i++) {
    //     document.getElementById("demo").innerHTML =  value[i];
    // }  
      
    //   window.onload = function(){
    //     JSON.stringify(result)
    //   }
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

            <Alert status='error' display={displayAlert}>
              <AlertIcon />
              <AlertTitle mr={2}>"Oops!"</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>

            <Button type="submit" colorScheme='blue' isLoading = {loading}> Submit </Button>
            <br/><br/><br/><br/>
            
        </form>
        
    <div class="center">
        <Center fontWeight="bold">Brand: <Center id="demo"  fontWeight="bold" ></Center></Center>
        <Center fontWeight="bold">Model:<Center id="demo1" align="center" fontWeight="bold" ></Center></Center>
        
        <Center fontWeight="bold">Description:<Center id="demo3" align="center" fontWeight="bold" ></Center></Center>
        <Center fontWeight="bold">Manufactuer Name:<Center id="demo4" align="center" fontWeight="bold" ></Center></Center>
        <Center fontWeight="bold">Manufactuer Location:<Center id="demo5" align="center" fontWeight="bold" ></Center></Center>
        <Center fontWeight="bold">Manufactuer Time<Center id="demo6" align="center" fontWeight="bold" ></Center></Center>
        <Center fontWeight="bold" color={"white"}>Description:<Center color={"white"} id="demo2" align="center" fontWeight="bold" ></Center></Center>
    </div>
    <br/><br/><br/>
<Trev/>
  </div>
  );
}