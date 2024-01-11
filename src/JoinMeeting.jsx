import { Flex, Button, Text, Input, useConst } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";

export var userJoin = null;

const JoinMeeting = () => {
  const [peerId, setPeerId] = React.useState("");
  const navigate = useNavigate();
  //Creating Peer
  const createPeer = () => {
    console.log("createPeer triggered");
    var peer = new Peer();
    peer.on("open", (id) => {
      navigate(`/meeting/${id}:${peerId}`);
    });

    userJoin = peer;
  };

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
        Joining Meeting
      </Text>

      {/* Enter details of the Meeting */}
      <Flex
        flexDirection={"column"}
        gap={5}
        boxShadow={"lg"}
        padding={5}
        rounded={"3xl"}
        border={"2px dotted blue"}
      >
        <Text
          align={"center"}
          fontWeight={"bold"}
          color={"blue.500"}
          fontSize={"2xl"}
        >
          PEER ID
        </Text>
        <Input
          placeholder="Enter Peer ID here"
          value={peerId}
          onChange={(e) => setPeerId(e.target.value)}
        />

        <Button onClick={createPeer}>Join</Button>
      </Flex>

      <Flex position={"absolute"} top={10} left={10}>
        <Link to={"/"}>
          <Button colorScheme="teal">Home</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default JoinMeeting;
