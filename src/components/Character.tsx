import { Box } from "@chakra-ui/react";
import React, { MutableRefObject } from "react";

function Character({
  char,
  charPos,
  setCursor,
  hiddenTextArea,
}: {
  char: string;
  charPos: number;
  setCursor: Function;
  hiddenTextArea: MutableRefObject<HTMLInputElement>;
}) {
  return (
    <Box
      as="span"
      letterSpacing="0px"
      onClick={() => {
        hiddenTextArea.current.setSelectionRange(charPos, charPos);
        setCursor(charPos);
      }}
    >
      {char}
    </Box>
  );
}

export default Character;
