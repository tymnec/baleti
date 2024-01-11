import {
  Flex,
  Button,
  Code,
  Alert,
  AlertIcon,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaCamera } from "react-icons/fa6";
import { useEffect } from "react";

// Alert Box
const CopiedAlert = () => {
  return (
    <Flex position={"fixed"} top={10} right={10}>
      <Alert status="success" rounded={"full"}>
        <AlertIcon />
        Copied !
      </Alert>
    </Flex>
  );
};

const Meeting = () => {
  const [copied, setCopied] = React.useState(false);
  const [currentUserVideo, setCurrentUserVideo] = React.useState(null);
  const [anotherUserVideo, setAnotherUserVideo] = React.useState(null);
  const [cameraOpened, setCameraOpened] = React.useState(
    navigator.mediaDevices ? false : true
  );
  const { meetingId } = useParams();

  // Open Camera
  const openCamera = () => {
    setCameraOpened(true);
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setCurrentUserVideo(stream);
      });
  };

  return (
    <Flex
      margin={"auto"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {/* Back Button  */}
      <Flex position={"absolute"} top={10} left={10}>
        <Link to={"/"}>
          <Button colorScheme="teal">Home</Button>
        </Link>
      </Flex>
      {/* Window */}
      <Flex
        border={"2px dotted gray"}
        width={"80vw"}
        height={"70vh"}
        rounded={"3xl"}
        boxShadow={"xl"}
        flexDirection={"row"}
        gap={10}
        padding={5}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {/* Your Sides */}
        <Flex>
          {!cameraOpened && (
            <Button colorScheme="teal" rounded={"3xl"} onClick={openCamera}>
              <FaCamera />
            </Button>
          )}
          {currentUserVideo && (
            <Box border={"3px solid gray"} width={"80%"} height={"80%"}>
              <video
                autoPlay
                playsInline
                muted
                ref={(video) => {
                  if (video) {
                    video.srcObject = currentUserVideo;
                  }
                }}
                width={"100%"}
                height={"100%"}
              />
            </Box>
          )}
        </Flex>

        {/* Another Person Sides */}
        <Flex>
          {!anotherUserVideo && (
            <Button colorScheme="whatsapp">Invite a friend</Button>
          )}
        </Flex>
      </Flex>
      {/* Meeting ID */}
      <Flex
        gap={5}
        position={"absolute"}
        bottom={10}
        justify={"center"}
        align={"center"}
      >
        <Code
          padding={3}
          rounded={"3xl"}
          colorScheme={"whatsapp"}
          border={"3px solid green"}
        >
          {meetingId}
        </Code>
        <Button
          colorScheme="whatsapp"
          rounded={"3xl"}
          onClick={() => {
            navigator.clipboard.writeText(meetingId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          Copy
        </Button>

        {/* Alert Box */}
        {copied && <CopiedAlert />}
      </Flex>
    </Flex>
  );
};

export default Meeting;
