import { Flex, Button, Code, Alert, AlertIcon, Box } from "@chakra-ui/react";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaCamera } from "react-icons/fa6";

// Alert Box
const CopiedAlert = () => {
  return (
    <Flex position={"absolute"} top={10} right={10}>
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
        window.stream = stream;
        document.querySelector("video").srcObject = stream;
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
      {!cameraOpened && (
        <Button colorScheme="teal" rounded={"3xl"} onClick={openCamera}>
          <FaCamera />
        </Button>
      )}
      {/* Your Video */}
      {currentUserVideo && (
        <Box top={10} right={10} border={"3px solid gray"} width={"20rem"}>
          <video
            autoPlay
            playsInline
            muted
            ref={(video) => {
              if (video) {
                video.srcObject = window.stream;
              }
            }}
            width={"100%"}
            height={"100%"}
          />
        </Box>
      )}
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
