import { Box, CloseButton, HStack, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { BubbleInterface } from "../interface/BubbleInterface";

export default function Bubble({
  bubble,
  bubbles,
  setBubbles,
  hasBeenRemoved
}: {
  bubble: BubbleInterface;
  bubbles: BubbleInterface[];
  setBubbles: Function;
  hasBeenRemoved: Function
}) {
  const [inputWidth, setInputWidth] = useState(5);

  const updateBubbleValue = (id: number, value: string) => {
    let update = [...bubbles];

    update.splice(id - 1, 1);
    update.splice(id - 1, 0, { id, value });

    setBubbles(update);
  };

  const removeBubble = (id: number) => {
    let remove = bubbles.filter((bubble) => {
      return bubble.id !== id;
    });

    remove = remove.map((bubble, index) => {
      let id = bubble.id;
      if (id !== index + 1) {
        id = index + 1;
      }
      return { id, value: bubble.value };
    });

    hasBeenRemoved(id);

    setBubbles(remove);
  };

  return (
    <Box
      padding="1.5"
      maxW={3 + inputWidth + "ch"}
      borderRadius="20"
      bg="secondary.main"
      color="text.main"
    >
      <HStack>
        <CloseButton
          size="sm"
          onClick={() => {
            removeBubble(bubble.id);
          }}
        />
        <Input
          focusBorderColor="transparent"
          border="none"
          h="6"
          autoFocus
          borderBottom="white"
          padding={0}
          margin={0}
          w={inputWidth + "ch"}
          value={bubble.value}
          onChange={(e) => {
            updateBubbleValue(bubble.id, e.target.value);
            setInputWidth(e.target.value.length + 3);
          }}
        />
      </HStack>
    </Box>
  );
}
