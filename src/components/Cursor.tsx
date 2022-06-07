import React from "react";

export default function Cursor({
  cursPos,
  charPos,
  textLength,
}: {
  cursPos: number;
  charPos: number;
  textLength: number;
}) {
  return (
    <>
      {cursPos === charPos && (
        <span
          className={cursPos === textLength ? "Blinker End-of-Line" : "Blinker"}
        >
          |
        </span>
      )}
    </>
  );
}
