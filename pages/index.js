import Head from 'next/head'
import { Flex, Text, Center, Heading,Container } from "@chakra-ui/react";
import VideoBackground from "../pages/components/VideoBackground";
import { motion } from "framer-motion";
import Header from "../pages/components/Header";
import Footer from './components/Footer';

export default function Home() {
  const MotionHeading = motion(Heading);
  const MotionText = motion(Text);
  return (
    <div>
      <Head>
        <title>BlockCheck</title>
        <meta name="title" content="Mini Project" />

      </Head>
      <VideoBackground />
      <Header/>
      <Center  fontSize="6xl" fontWeight="bold" color="white">
        Welcome To BlockCheck
      </Center>
      <br/>
      <Center  fontSize="3xl" color="white">
        Your Product Checker
      </Center>
      <br/>
      <Container fontSize="4xl" color="white">
        Checking Originality of Medicines,Footwear,Clothing,Sports Goods and much more.
      </Container>
      <br/><br/><br/><br/><br/><br/><br/>
      <Footer/>
    </div>
  )
}
