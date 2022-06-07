import React, { useState } from "react";
import { PhoneIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Circle,
  HStack,
  Stack,
  VStack,
  Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Stack
        onClick={() => {
          setShow(true);
        }}
        onMouseLeave={() => {
          setShow(false);
        }}
        bg="secondary.main"
      >
        <ButtonGroup py="1" px="2">
          <Stack>
            <Button color="primary.main" variant="link">
              <HStack>
                <Circle  size="40px" bg="primary.main" color="text.main">
                  <PhoneIcon />
                </Circle>
                <Link  to="/dashboard">{show ? <Text mx='2'>Dashboard</Text> : ""}</Link>
              </HStack>
            </Button>
            <Button color="primary.main" variant="link">
              <HStack>
                <Circle size="40px" bg="primary.main" color="text.main">
                  <PhoneIcon />
                </Circle>
              </HStack>
              <Link to="/dashboard">{show ? <Text mx='2'>Dashboard</Text> : ""}</Link>
            </Button>
          </Stack>
        </ButtonGroup>
      </Stack>
    </>
  );
}
