import { Button, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const HeroPage = () => {
  return (
    <Flex
      margin={"auto"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={10}
    >
      <Flex
        flexDirection={"row"}
        gap={10}
        boxShadow={"lg"}
        padding={10}
        rounded={"3xl"}
        border={"2px dotted gray"}
      >
        {/* Join Meeting */}
        <Link to={"/join-meeting"}>
          <Button colorScheme="blue">Join Meeting</Button>
        </Link>
        {/* Create Meeting */}
        <Link to={"/create-meeting"}>
          <Button colorScheme="gray">Create Meeting</Button>
        </Link>
      </Flex>

      {/* About */}
      <Link to={"/about"}>
        <Icon
          fontSize={"5xl"}
          as={Icon}
          color={"blue.500"}
          cursor={"pointer"}
          boxShadow={"lg"}
          rounded={"full"}
        />
      </Link>
    </Flex>
  );
};

export default HeroPage;
