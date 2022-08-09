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

export default function formCustomer() {
    const [name, setName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
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
      await instance.methods
      .createCustomer( 
        web3.utils.asciiToHex(emailAddress),
        // emailAddress,
        name,
        phoneNumber)
      .send({
        from: accounts[0]
        // gas : '100000',
        // value: web3.utils.toWei('0.000001', 'ether')
      });
      // console.log(boolRes);
      // const result = await instance.methods
      // .getCustomerDetails( web3.utils.asciiToHex(emailAddress))
      // .call();
      // console.log(result);
    } catch (err) {
      setDisplayAlert('');
      setErrorMessage( err.message );
      console.log(err);
    }
    setLoading(false);
    }



  return <div>
      <Head>
        <title>Customer Registration</title>
        <meta name="title" content="Mini Project" />

      </Head>
      <Greg />
      
      <div align =  'center'>
        <Text fontSize="2xl" fontWeight="bold">Customer Registration</Text>
      </div>
        <form onSubmit={onSubmit}>
            <FormControl  >
              <FormLabel htmlFor='first-name'>Name</FormLabel>
              <Input id='first-name' 
               value={name}
               name="name"
               onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl  >
              <FormLabel htmlFor='email'>Email address</FormLabel>
              <Input 
              id='email' 
              type='email' 
              value={emailAddress}
              name="emailAddress"
              onChange={(e) => setEmailAddress(e.target.value)}
              />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
        
            <FormControl  >
              <FormLabel>Phone Number</FormLabel>
              <Input
              value={phoneNumber}
              name="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <FormHelperText>We'll never share your Phone Number.</FormHelperText>
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
            <br/><br/><br/><br/><br/><br/>
            <Trev/>
        </form>
  </div>;
}
