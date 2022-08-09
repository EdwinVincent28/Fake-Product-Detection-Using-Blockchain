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
    Text
  } from '@chakra-ui/react'

import web3 from "../../ethereum/web3";
import instance from "../../ethereum/instance";
import Trev from '../components/Trev';
import Greg from '../components/greg';

export default function transferProduct() {
  
    const [sellerEmailAddress, setSellerEmailAddress] = useState("");
    const [productCode, setProductCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [displayAlert, setDisplayAlert] = useState('none');

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");
        

    try {
      const accounts = await web3.eth.getAccounts();
      // console.log(emailAddress,name,phoneNumber);

      const boolRes =  await instance.methods
      .addRetailerToCode( productCode, web3.utils.asciiToHex(sellerEmailAddress))
      .send({
        from: accounts[0]
        // value: web3.utils.toWei("0.000002", "ether"),
      });
      console.log(boolRes);
      const result = await instance.methods
      .getOwnedCodeDetails(productCode)
      .call();
      console.log(result);
    } catch (err) {
      setDisplayAlert('');
      setErrorMessage( err.message );
      console.log(err);
    }
    setLoading(false);
    }



  return <div>
      <Head>
        <title>Transfer Product</title>
        <meta name="title" content="Mini Project" />

      </Head>
      <Greg />
      
      <div align =  'center'>
        <Text fontSize="2xl" fontWeight="bold">Transfer Product (Manufacturer to Seller)</Text>
      </div>
        <form onSubmit={onSubmit}>

            <FormControl  >
              <FormLabel >Product ID</FormLabel>
              <Input 
               value={productCode}
               name="productCode"
               onChange={(e) => setProductCode(e.target.value)}
              />
            </FormControl>

            <FormControl  >
              <FormLabel htmlFor='email'> Seller Email address</FormLabel>
              <Input 
              id='email' 
              type='email' 
              value={sellerEmailAddress}
              name="sellerEmailAddress"
              onChange={(e) => setSellerEmailAddress(e.target.value)}
              />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>

            <Alert status='error' display={displayAlert}>
              <AlertIcon />
              <AlertTitle mr={2}>"Oops!"</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
              {/* <CloseButton position='absolute' right='8px' top='8px' /> */}
            </Alert>

            <Button type="submit"
             colorScheme='blue'
             isLoading = {loading}
            >
             Submit
            </Button>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <Trev/>
        </form>
  </div>;
}
