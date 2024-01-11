import { Button, Flex, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Flex
      margin={"auto"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={10}
      flexDirection={"column"}
    >
      <Text fontSize={"5xl"} fontWeight={"bold"}>
        Baleti is a WebRTC based video conferencing app.
      </Text>
      <Link to={"/"}>
        <Button colorScheme="gray">Back</Button>
      </Link>
    </Flex>
  );
};

export default About;
