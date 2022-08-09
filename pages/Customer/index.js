import Head from 'next/head'
import { Flex, Text, Center, Heading,Container,Button,Stack,Box,Link, MenuItem } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import VideoBackground from "../components/VideoBackground";
import Header from "../components/Header";
import Footer from '../components/Footer';

export default function Home() {
 
  return (
    <div>
      <Head>
        <title>BlockCheck</title>
        <meta name="title" content="Mini Project" />

      </Head>
      <VideoBackground />
      <Header/>
      <Center  fontSize="6xl" fontWeight="bold" color="white">
        Welcome To Customer Section
      </Center>
      <br/><br/>
      <Center fontSize="xl" fontWeight="bold" color="white">
        <Link href='http://localhost:3000/Customer/formCustomer' isExternal>
            Customer Registration <ExternalLinkIcon mx='2px' />
        </Link>
      </Center>
      <br/><br/>
      <Center fontSize="xl" fontWeight="bold" color="white">
        <Link href='http://localhost:3000/Customer/transferOwner' isExternal>
            Transfer Owner <ExternalLinkIcon mx='2px' />
        </Link>
      </Center>
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer/>
    </div>
  )
}
