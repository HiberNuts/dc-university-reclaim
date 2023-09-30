import React, { createRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import Preview from "./Preview";
// import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
const CreateCourse = () => {
  const toolBarRef = createRef();

  const [editorContent, seteditorContent] = useState("");

  const toolbarConfig = {
    heading: {
      options: [
        { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
        { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
        { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
        { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
        { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
        { model: "heading5", view: "h5", title: "Heading 5", class: "ck-heading_heading5" },
        { model: "heading6", view: "h6", title: "Heading 6", class: "ck-heading_heading6" },
      ],
    },
  };

  return (
    <div className="container">
      <div className="border-solid rounded-lg m-10 bg-white w-[90%] ">
        <div className="rounded-lg p-4" ref={toolBarRef} />
        <CKEditor
          editor={Editor}
          className="p-10"
          style={{ padding: "20px" }}
          config={toolbarConfig}
          onReady={(editor) => {
            if (toolBarRef.current) {
              toolBarRef.current.appendChild(editor.ui.view.toolbar.element);
            }
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            seteditorContent(data);
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
      <Preview editorContent={editorContent} />
    </div>
  );
};

export default CreateCourse;
