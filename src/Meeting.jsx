import {
  Flex,
  Button,
  Code,
  Alert,
  AlertIcon,
  Box,
  Text,
  useProgressStyles,
} from "@chakra-ui/react";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaCamera } from "react-icons/fa6";
import { useEffect } from "react";
import Peer from "peerjs";
import { userJoin } from "./JoinMeeting";
import { userCreate } from "./CreateMeeting";

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

const ConnectedAlert = () => {
  return (
    <Flex position={"fixed"} top={10} right={10}>
      <Alert status="success" rounded={"full"}>
        <AlertIcon />
        Connected !
      </Alert>
    </Flex>
  );
};

const Meeting = () => {
  const [copied, setCopied] = React.useState(false);
  const [currentUserVideo, setCurrentUserVideo] = React.useState(null);
  const [anotherUserVideo, setAnotherUserVideo] = React.useState(null);
  const [userPreference, setUserPreference] = React.useState(null);
  const [cameraOpened, setCameraOpened] = React.useState(
    navigator.mediaDevices ? false : true
  );
  const { meetingId } = useParams();
  const [yourId, setYourId] = React.useState("");
  const [peerId, setPeerId] = React.useState("");
  const [connected, setConnected] = React.useState(false);

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

  // Connect to Peer Server
  const connect = () => {
    // console.log(user);
    if (userPreference === "host") {
      console.log(userCreate);
      userCreate.on("connection", (conn) => {
        conn.on("open", () => {
          console.log("Connected");

          setConnected(true);
          setTimeout(() => {
            setConnected(false);
          }, 3000);
        });
      });
    } else if (userPreference === "joining") {
      console.log(userJoin);
      var conn = userJoin.connect(peerId);
      conn.on("open", () => {
        console.log("Connected");
        setConnected(true);
        setTimeout(() => {
          setConnected(false);
        }, 3000);
      });
    }
  };

  useEffect(() => {
    connect();
  }, [peerId]);

  useEffect(() => {
    var yourId =
      meetingId.search(":") === -1 ? meetingId : meetingId.split(":")[0];
    var peerId = meetingId.search(":") === -1 ? "" : meetingId.split(":")[1];

    console.log("Meeting ID: " + meetingId);
    console.log("Your ID: " + yourId);
    console.log("Peer Id: " + peerId);
    setPeerId(peerId);
    setYourId(yourId);

    meetingId.search(":") === -1
      ? setUserPreference("host")
      : setUserPreference("joining");

    console.log(userPreference);
  }, []);

  const joinCall = () => {
    if (userPreference === "joining") {
      if (!cameraOpened) openCamera();
      else {
        var call = userJoin.call(peerId, currentUserVideo);

        call.on("stream", function (stream) {
          setAnotherUserVideo(stream);
        });
      }
    }
  };

  const answerCall = () => {
    if (userPreference === "host") {
      if (!cameraOpened) openCamera();
      else {
        userCreate.on("call", (call) => {
          call.answer(currentUserVideo);
          call.on("stream", function (stream) {
            setAnotherUserVideo(stream);
            console.log("Answered");
          });
        });
      }
    }
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
        <Flex wrap={"wrap"}>
          {!anotherUserVideo ? (
            <Button colorScheme="whatsapp">Invite a friend</Button>
          ) : (
            <Flex>
              <Box border={"3px solid gray"} width={"80%"} height={"80%"}>
                <video
                  autoPlay
                  playsInline
                  muted
                  ref={(video) => {
                    if (video) {
                      video.srcObject = anotherUserVideo;
                    }
                  }}
                  width={"100%"}
                  height={"100%"}
                />
              </Box>
            </Flex>
          )}

          {peerId && !anotherUserVideo && (
            <Button marginX={5} onClick={joinCall}>
              Join Call
            </Button>
          )}

          {!anotherUserVideo && (
            <Button marginX={5} onClick={answerCall}>
              Answer Call
            </Button>
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
          width={"max-content"}
        >
          {meetingId.search(":") === -1 ? meetingId : meetingId.split(":")[1]}
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

        {/* Connected */}
        {connected && <ConnectedAlert />}
      </Flex>
    </Flex>
  );
};

export default Meeting;
