import { Flex, Link, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex w="100%" h={{ md: "9vh" }} py="20px" gridGap="2" align="center">
      <Flex width="90%" mx="auto" flexDir={["column-reverse", "row", "row", "row"]} align="center" >
        <Text noOfLines={2} flex={2} color="white">
          Developed by{" "}
          <Link target="_blank" href="https://github.com/dcostat04"> Trevor</Link>
          ,{" "}
          <Link target="_blank" href="https://github.com/EDWINcible"> Edwin</Link>
          ,{" "}
          <Link target="_blank" href="https://github.com/gregbg218">
            Gregory
          </Link>{" "}
          &{" "}
          <Link target="_blank" href="https://github.com/AaditeeDP"> Aaditee</Link>
        </Text>
        <Text flex={1} as="a" href={"https://fcrit.ac.in"} color="white" textAlign={["center", "end", "end", "end"]} >
          F.C.R.I.T
        </Text>
      </Flex>
    </Flex>
  );
}
