import React, { useEffect, useState } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import {
  align,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  lineHeight,
  list,
  paragraphStyle,
  table,
  template,
  textStyle,
  image,
  link,
} from "suneditor/src/plugins";
import "suneditor/dist/css/suneditor.min.css";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getTags } from "../redux/tagSlice";

const Editor = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tag.tags);
  const themeColor = useAppSelector((state) => state.theme.color);

  useEffect(() => {
    (async () => {
      await dispatch(getTags());
    })();
  }, []);

  function handleChange(content) {
    console.log("OnChange: ", content);
  }

  const handleImageUploadBefore = (files, info, core, uploadHandler) => {
    // const formData = new FormData()
    // formData.append('avatar', files[0])
    // console.log(info);
    const response = {
      result: [
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFBa3G11OUBYADP7ouSBgwiiRzSYorF4dfg&usqp=CAU",
          name: "hello world",
        },
      ],
    };
    uploadHandler(response);
  };

  return (
    <>
      <Box display={"flex"}>
        <SunEditor
          name="my-editor"
          setAllPlugins={true}
          autoFocus={true}
          setOptions={{
            showPathLabel: false,
            minHeight: "60vh",

            maxHeight: "60vh",

            placeholder: "Enter your text here!!!",

            plugins: [
              align,
              font,
              fontColor,
              fontSize,
              formatBlock,
              hiliteColor,
              horizontalRule,
              lineHeight,
              list,
              paragraphStyle,
              table,
              template,
              textStyle,
              image,
              link,
            ],
            buttonList: [
              ["undo", "redo"],
              ["font", "fontSize", "formatBlock"],
              ["paragraphStyle"],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
              ],
              ["fontColor", "hiliteColor"],
              ["removeFormat"],
              "/", // Line break
              ["outdent", "indent"],
              ["align", "horizontalRule", "list", "lineHeight"],
              ["table", "link", "image"],
            ],
            formats: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
            font: [
              "Arial",
              "Calibri",
              "Comic Sans",
              "Courier",
              "Garamond",
              "Georgia",
              "Impact",
              "Lucida Console",
              "Palatino Linotype",
              "Segoe UI",
              "Tahoma",
              "Times New Roman",
              "Trebuchet MS",
            ],
          }}
          onChange={handleChange}
          onImageUploadBefore={handleImageUploadBefore}
        />
        <Autocomplete
          multiple
          limitTags={5}
          id="multiple-limit-tags"
          options={tags}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} placeholder="Search Tag" />
          )}
          sx={{
            maxWidth: "400px",
            minWidth: "400px",
            minHeight: "100px",
            ...(themeColor === "dark"
              ? { backgroundColor: "rgb(255 242 242)", color: "#171717" }
              : { backgroundColor: "#0E1217", color: "rgb(255 242 242)" }),
          }}
        />
      </Box>
    </>
  );
};

export default Editor;
