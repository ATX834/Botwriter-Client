import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Heading, Text, useToast } from "@chakra-ui/react";
import "../theme/styles.css";
import TextEditor from "../components/TextEditor";

export default function Dashboard() {
  const [token, setToken]: [string, Function] = useState("");
  const { user, isLogged } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      toast({
        title: `Welcome back ${user.firstname} ${user.lastname} !`,
        position: "top",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isLogged]);

  return (
    <>
      <Heading>Dashboard</Heading>
      <TextEditor />
      {user && user.email && <Text>Votre email: {user.email} !</Text>}
    </>
  );
}
