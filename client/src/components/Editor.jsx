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
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getTags } from "../redux/tagSlice";
import { addImage } from "../redux/cloudSlice";

const Editor = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tag.tags);
  const themeColor = useAppSelector((state) => state.theme.color);
  const article = useAppSelector((state) => state.article.article);
  const [articleContent, setArticleContent] = useState("");

  useEffect(() => {
    (async () => {
      await dispatch(getTags());
    })();
  }, []);

  function handleChange(content) {
    setArticleContent(content);
  }

  const handleImageUploadBefore = async (files, info, core, uploadHandler) => {
    const formData = new FormData();
    formData.append("file", files[0], "file");

    const {
      payload: {
        data: { secure_url },
      },
    } = await dispatch(addImage(formData));

    const response = {
      result: [
        {
          url: secure_url,
          name: "hello world",
        },
      ],
    };
    uploadHandler(response);
  };

  const handleAddArticle = async () => {
    // await dispatch(addAr)
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
            maxWidth: "58vw",
            minWidth: "58vw",
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
          // defaultValue={article.content}
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
              ? { backgroundColor: "rgb(255, 242, 242)", color: "#171717" }
              : { backgroundColor: "#fff", color: "rgb(255 242 242)" }),
          }}
        />
      </Box>
      <Button
        sx={{
          width: "200px",
          marginTop: "20px",
          marginLeft: "calc(50vw - 14vw - 100px)",
          textTransform: "none",
          backgroundColor: `${
            themeColor === "light" ? "rgb(255 248 248)" : "#000000"
          }`,
          border: "1px solid #a3a3a3",
          color: `${themeColor === "light" ? "#171717" : "#fff2f2"}`,
        }}
        onClick={handleAddArticle}
      >
        Add Article
      </Button>
    </>
  );
};

export default Editor;
