import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import apiInstance from "../../services/axios_helper";
import "./styles.scss";
import { getImgUrlFromServer } from "../../utils/common";

export default function WrapEditor({ onChangeCallback }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (state) => {
    setEditorState(state);
    onChangeCallback(draftToHtml(convertToRaw(state.getCurrentContent())));
  };

  // const uploadCallback = (file) => {
  //   return new Promise((resolve, reject) => {
  //     if (file) {
  //       let reader = new FileReader();
  //       reader.onload = (e) => {
  //         resolve({ data: { link: e.target.result } });
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   });
  // };
  /* call API upload */
  const uploadCallback = (file) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("uploadImg", file);
      apiInstance
        .post("/api/upload", data)
        .then((res) => {
          resolve({ data: { link: getImgUrlFromServer(res.data.path) } });
        })
    });
  };

  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            uploadCallback: uploadCallback,
            alt: { present: true, mandatory: true },
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
            defaultSize: {
              height: "auto",
              width: "auto",
            },
          },
        }}
      />
    </>
  );
}
