import { Box, HStack, VisuallyHiddenInput, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Bubble from "./Bubble";
import { TextInterface } from "../interface/TextInterface";
import { BubbleInterface } from "../interface/BubbleInterface";
import WrittableText from "./WrittableText";

export default function TextEditor() {
  // Réf. de l'input caché, utile pour intéragir avec
  const hiddenTextArea = useRef<HTMLInputElement>(
    document.createElement("input")
  );

  // Pour gérer la taille du champ d'écriture
  const [charsByLine] = useState(57);
  const [areaNbofLines] = useState(10);

  // Gérer le curseur d'écriture
  const [cursor, setCursor]: [number | null, Function] = useState(0);

  // Gérer l'écriture dans l'input caché
  const [focus, setFocus] = useState(false);

  // Ajout extérieur
  const [input, setInput] = useState("");

  const [textBody, setTextBody]: [TextInterface[], Function] = useState([]);
  const [bubbles, setBubbles]: [BubbleInterface[], Function] = useState([]);

  const [saveInput, setSaveInput]: [string | boolean, Function] =
    useState(false);
  const [bubbleRemoved, setBubbleRemoved]: [number | boolean, Function] =
    useState(false);

  // Action à l'écriture dans l'input caché
  const onChangeHiddenTextArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    // ON LANCE LA COMMANDE POUR OUVRIR UNE BULLE
    if (input.includes("_@_")) {
      const [start, end] = input.split("_@_");

      // ON VÉRIFIE QUE L'INPUT PRÉCÉDENT NE CONTIENT UNIQUEMENT DES WHITESPACES
      if (start.replaceAll(" ", "").length !== 0) {
        const selectedIndex = textBody.findIndex((text) => text.selected);

        let newTextBody = [...textBody];
        // ON VÉRIFIE SI LE CHAMP MODIFIÉ EST UN DES TEXTES SELECTIONNÉS DU TEXTBODY
        // ET ON MODIFIE LE TEXTE A L'INTÉRIEUR
        if (selectedIndex !== -1) {
          newTextBody.splice(selectedIndex, 1);
          newTextBody.splice(selectedIndex, 0, {
            id: selectedIndex + 1,
            value: " " + start,
            selected: false,
          });
        } else {
          newTextBody.push({
            id: textBody.length + 1,
            value: " " + start,
            selected: false,
          });
        }
        setTextBody(newTextBody);
        addNewBubble({ id: bubbles.length + 1, value: "" });
      }
      setInput(" " + end);
    }
    setCursor(e.target.selectionStart);
  };

  // Event listener sur la pression des flèches pour modifier la position du curseur
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setTimeout(() => {
        setCursor(hiddenTextArea.current.selectionStart);
      }, 100);
    }
  });

  // const addNewTextToBody = (text: TextInterface) => {
  //   setTextBody([
  //     ...textBody,
  //     {
  //       id: text.id,
  //       value: text.value,
  //       selected: text.selected,
  //     },
  //   ]);
  // };

  const addNewBubble = (bubble: BubbleInterface) => {
    setBubbles([
      ...bubbles,
      {
        id: bubble.id,
        value: bubble.value,
      },
    ]);
  };

  useEffect(() => {
    if (bubbleRemoved) {
      let newText = "";

      let newTextBody = [...textBody];

      let updatingTextBody = newTextBody.splice(bubbleRemoved - 1, 2);

      for (const text of updatingTextBody) {
        newText += text.value;
        newText = newText.replace("  ", "");
      }
      newTextBody.splice(bubbleRemoved - 1, 0, {
        id: bubbleRemoved,
        value: newText,
        selected: false,
      });

      setTextBody(newTextBody);
      setBubbleRemoved(false);
    }
  }, [bubbleRemoved]);

  useEffect(() => {
    console.log("saveInput", saveInput);
    saveInput && console.log("saveInput.length", saveInput["length"]);
  }, [saveInput]);

  return (
    <Box
      bg="white"
      w={charsByLine + 10 + "ch"}
      h={areaNbofLines * 32 + "px"}
      borderRadius={8}
      display="flex"
      justifyContent="center"
      alignItems="center"
      onClick={() => {
        if (!focus) {
          setFocus(true);
          hiddenTextArea.current.focus();
        } else {
          setFocus(false);
        }
      }}
    >
      <VisuallyHiddenInput
        value={input}
        ref={hiddenTextArea}
        onChange={(e) => onChangeHiddenTextArea(e)}
      />

      <Box
        lineHeight="30px"
        w={charsByLine + "ch"}
        h={areaNbofLines * 30 + "px"}
        bg="white"
      >
        <HStack color="black">
          {textBody.map((text) => {
            return (
              <>
                {text.selected ? (
                  <WrittableText
                    input={input}
                    areaNbofLines={areaNbofLines}
                    hiddenTextArea={hiddenTextArea}
                    cursor={cursor}
                    setCursor={setCursor}
                  />
                ) : (
                  <Text
                    backgroundColor="blue.300"
                    onClick={(e) => {
                      if (!saveInput) {
                        setSaveInput(input);
                      }
                      const updateSelect = [...textBody].map((text) => {
                        return { ...text, selected: false };
                      });

                      updateSelect.splice(text.id - 1, 1);
                      updateSelect.splice(text.id - 1, 0, {
                        ...text,
                        selected: true,
                      });

                      setTextBody(updateSelect);

                      const target = e.target as HTMLParagraphElement;
                      setInput(target.innerText);
                    }}
                  >
                    {text.value}
                  </Text>
                )}
                {bubbles.map((bubble) => {
                  return (
                    text.id === bubble.id && (
                      <Bubble
                        bubble={bubble}
                        bubbles={bubbles}
                        setBubbles={setBubbles}
                        hasBeenRemoved={setBubbleRemoved}
                      />
                    )
                  );
                })}
              </>
            );
          })}

          {saveInput ? (
            <Text
              padding={saveInput['length'] > 1 ? 0 : "1ch"}
              backgroundColor={"red"}
              onClick={(e) => {
                setInput(saveInput);
                setTextBody(
                  [...textBody].map((text) => {
                    return { ...text, selected: false };
                  })
                );
                setSaveInput(false);
              }}
            >
              {saveInput}
            </Text>
          ) : (
            <WrittableText
              input={input}
              areaNbofLines={areaNbofLines}
              hiddenTextArea={hiddenTextArea}
              cursor={cursor}
              setCursor={setCursor}
            />
          )}
        </HStack>
      </Box>
    </Box>
  );
}
