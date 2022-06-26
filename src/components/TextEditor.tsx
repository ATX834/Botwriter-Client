import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { html2json } from "html2json";
import ModalInput from "./ModalInput";
import { useMutation } from "@apollo/client";
import { CREATE_SAMPLE_LETTER } from "../graphql/mutations/SampleLetter";

export default function TextEditor() {
  const [value, setValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [doCreateSampleLetter] = useMutation(CREATE_SAMPLE_LETTER);

  const editorRef = useRef(null) as MutableRefObject<any>;

  useEffect(() => {
    if (value) {
      const width = `${2 + value.length}ch`;
      let newInput = `<input style="width: ${width};background-color:black; color: white" value=${value} />`;
      editorRef.current.setContent(
        editorRef.current.getContent().replace(/\/@/s, newInput)
      );
      setValue("");
    }
  }, [value]);

  const handleSubmitSampleLetter = () => {
    if (editorRef.current) {
      const newSampleTextContent = JSON.stringify(html2json(editorRef.current.getContent())) 
    }
  }

  const handleEditorChange = (actual: any) => {
    if (editorRef.current) {
      if (actual.includes("/@")) {
        onOpen();
      }
    }
  };
  return (
    <div style={{ width: "800px" }}>
      <Editor
        apiKey="srmix3kf92bli4dxfo9eeyfr4f7xnsjujbbkfea4mo252czw"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p></p>"
        init={{
          placeholder: "Write here...",
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={handleEditorChange}
      />
      {isOpen && (
        <ModalInput isOpen={isOpen} setValue={setValue} onClose={onClose} />
      )}
      <Button onClick={handleSubmitSampleLetter}>Submit sample letter</Button>
    </div>
  );
}
