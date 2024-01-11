import { Flex } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

const Meeting = () => {
  const { meetingId } = useParams();
  return (
    <Flex
      margin={"auto"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      Meeting {meetingId}
    </Flex>
  );
};

export default Meeting;
