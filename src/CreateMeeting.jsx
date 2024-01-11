import { Flex, Text, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const CreateMeeting = () => {
  return (
    <Flex
      margin={"auto"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={10}
      flexDirection={"column"}
    >
      {/* Heading */}
      <Text fontSize={"5xl"} fontWeight={"bold"} color={"blue.500"}>
        Create Meeting
      </Text>

      {/* Button */}
      <Button>Create Meeting</Button>

      {/* Back Button */}
      <Flex position={"absolute"} top={10} left={10}>
        <Link to={"/"}>
          <Button colorScheme="teal">Home</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default CreateMeeting;
