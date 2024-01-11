import { Flex, Button, Code, Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";
import { useParams, Link } from "react-router-dom";

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
  const { meetingId } = useParams();
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
      Meeting {meetingId}
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
