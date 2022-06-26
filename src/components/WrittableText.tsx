import React from "react";
import { Text } from "@chakra-ui/react";
import Character from "./Character";
import Cursor from "./Cursor";

export default function WrittableText({
  input,
  areaNbofLines,
  hiddenTextArea,
  cursor,
  setCursor,
}: {
  input: string;
  areaNbofLines: number;
  hiddenTextArea: React.MutableRefObject<HTMLInputElement>;
  cursor: number;
  setCursor: Function;
}) {
  return (
    <Text
      // backgroundColor="yellow"
      noOfLines={areaNbofLines}
    >
      {input.split("").map((char, index) => {
        return (
          <>
            <Character
              char={char}
              charPos={index + 1}
              setCursor={setCursor}
              hiddenTextArea={hiddenTextArea}
            />
            <Cursor
              cursPos={cursor}
              charPos={index + 1}
              textLength={input.length}
            />
          </>
        );
      })}
    </Text>
  );
}
