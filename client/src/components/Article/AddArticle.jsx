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
import "suneditor/dist/css/suneditor.min.css"; import TagFacesIcon from '@mui/icons-material/TagFaces'; import Chip from '@mui/material/Chip';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import { addImage } from "../../redux/cloudSlice";
import Navbar from "../../layouts/Navbar";
import { getBase64 } from "../../utils";
import { articleValidate } from "../../utils/validation";
import { addArticle } from "../../redux/articleSlice";
import { Link } from "react-router-dom";
import AlertInfo from "../AlertInfo";

const CssTextField = styled(TextField)({
  root: {
    "& label.Mui-focused": {
      color: "#1A2027",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "yellow",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#1A2027",
      },
      "&:hover fieldset": {
        borderColor: "#1A2027",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1A2027",
      },
    },
  },
});

const AddArticle = () => {
  const dispatch = useAppDispatch();
  const tagsList = useAppSelector((state) => state.tag.tags);
  const themeColor = useAppSelector((state) => state.theme.color);
  const article = useAppSelector((state) => state.article.article);
  const [content, setContent] = useState("");
  const [errMissInput, setErrMissInput] = useState(false);
  const [chude, setChude] = useState('');
  const [files, setFiles] = useState();
  const [articleForm, setArticleForm] = useState({
    title: "",
    thumbnailUrl: "",
    thumbnailBase64: "",
    files: null
  });
  const { title, thumbnailUrl, thumbnailBase64 } = articleForm;
  const handleDelete = (chipToDelete) => () => {
    console.log(chipToDelete.key);
    console.log(files);
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    // setFiles(files.splice(chipToDelete.key, 1))
    // console.log(files);

  };
  const [chipData, setChipData] = useState([]);


  function handleChange(content) {


    console.log(content);
    setContent(content);
  }

  function handleChangeTitle(e) {
    setArticleForm({ ...articleForm, title: e.target.value });
  }

  function handleChangeTags(e, tags) {
    let result = tags.map(({ name }) => name);

    return setArticleForm({ ...articleForm, tags: result });
  }

  const handleImageUploadBefore = async (files, info, core, uploadHandler) => {
    const formData = new FormData();
    formData.append("file", files[0], "file");

    const {
      payload: {
        data: { secure_url },
      },
    } = await dispatch(addImage(formData));
    console.log("secure_url", secure_url);
    const response = {
      result: [
        {
          url: "https://res.cloudinary.com/dxlsponnf/image/upload/v1693823112/du4hnogavkig1avmizxp.jpg",//secure_url,
          name: "hello world",
        },
      ],
    };
    await uploadHandler(response);
  };

  const handleAddArticle = async (e) => {
    try {


      const { error } = articleValidate({
        title,
        thumbnail: thumbnailUrl,
        content,
        chude
      });

      if (error) {
        console.log(error);
        e.preventDefault(); data.label === 'React' ? undefined :
          setErrMissInput(true);
      } else {
        console.log(files);
        await dispatch(
          addArticle({ title, thumbnail: thumbnailUrl, content, chude, files })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async (e) => {
    try {
      let thumbnail = new FormData();
      thumbnail.append("file", e.target.files[0], "file");

      const base64 = await getBase64(e.target.files[0]);
      setArticleForm({
        ...articleForm,
        thumbnailBase64: base64,
      });

      const {
        payload: {
          data: { url },
        },
      } = await dispatch(addImage(thumbnail));

      setArticleForm({
        ...articleForm,
        thumbnailBase64: base64,
        thumbnailUrl: url,
      });
    } catch (error) { }
  };

  const handleFiles = async (e) => {
    try {
      const files2 = e.target.files;
      const fileArr = []
      const fileFormArr = []


      for (let i = 0; i < files2.length; i++) {
        let files = new FormData();
        files.append('files[]', files2[i]);

        fileFormArr.push(files)
        fileArr.push({ key: i, label: files2[i].name })
      }
      console.log(fileArr);


      setChipData([...fileArr])
      setFiles(
        fileFormArr
      );
    } catch (error) { }
  };

  const handleChange2 = (event) => {
    setChude(event.target.value);
  };

  return (
    <>
      <Navbar notShowCreate={true} />

      <Stack
        component="form"
        m={"2%"}
        sx={{
          backgroundColor: "#fff",
          color: "rgb(255 242 242)",
        }}
        spacing={3}
        noValidate
      >
        <CssTextField
          onChange={handleChangeTitle}
          label="Tiêu đề"
          fullWidth={true}
          value={title}
        />

        <Box marginBottom={"10px"}>
          <Button
            component="label"
            sx={{
              textTransform: "none",
              border: "1px solid #a3a3a3",
              color: "black",
            }}
          >
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileUpload}
            />
            Ảnh chủ đề
          </Button>
        </Box>
        <img
          style={{
            display: `${thumbnailBase64 ? "block" : "none"}`,
            width: "320px",
            height: "200px",
            objectFit: "contain",
            borderRadius: "5px",
          }}
          src={thumbnailBase64}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Chủ đề</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={chude}
            label="Chủ đề"
            onChange={handleChange2}
          >
            <MenuItem value={"CAUHOI"}>Câu hỏi</MenuItem>
            <MenuItem value={"TINTUC"}>Tin tức</MenuItem>
            <MenuItem value={"TUYENDUNG"}>Tuyển dụng</MenuItem>
          </Select>
        </FormControl>

        {/* <Autocomplete
          multiple
          limitTags={5}
          id="multiple-limit-tags"
          options={tagsList}
          onChange={handleChangeTags}
          getOptionLabel={(option) => {
            return option.name;
          }}
          renderInput={(params) => {
            const arrTags = [];
            params.InputProps.startAdornment?.forEach((item) => {
              arrTags.push(item.props.label);
            });
            if (arrTags.length > 0) {
              // setArticleForm({ ...articleForm, tags: arrTags });
            }
            return <TextField {...params} placeholder="Add Tag" />;
          }}
          // onChange={(event, value) => console.log(value)}
          sx={{
            maxWidth: "100%",
            minHeight: "60px",
            marginBottom: "10px",
            backgroundColor: "#fff",
            color: "rgb(255 242 242)",
          }}
        /> */}

        <Box marginBottom={"10px"}>
          <Button
            component="label"
            sx={{
              textTransform: "none",
              border: "1px solid #a3a3a3",
              color: "black",
            }}
          >
            <input
              type="file"
              hidden
              multiple
              onChange={handleFiles}
            />
            Files
          </Button>

          {chipData.map((data) => {
            let icon;

            return (
              <div key={data.key} style={{ marginTop: "5px", marginLeft: "10px" }}>
                <Chip
                  variant="outlined"
                  icon={icon}
                  label={data.label}
                  onDelete={handleDelete(data)}
                />
              </div>

            );
          })}
        </Box>

        <SunEditor
          name="my-editor"
          setAllPlugins={true}
          setOptions={{
            showPathLabel: false,
            minHeight: "60vh",
            maxWidth: "100%",
            maxHeight: "60vh",

            placeholder: "Nội dung bài viết",

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
        // onImageUploadBefore={handleImageUploadBefore}
        />
      </Stack>
      <Link
        to={"../profile"}
        style={{ textDecoration: "none" }}
        onClick={handleAddArticle}
      >
        <Button
          sx={{
            width: "200px",
            margin: "20px 0 20px calc(50vw - 100px)",
            textTransform: "none",
            backgroundColor: "rgb(255 248 248)",
            border: "1px solid #a3a3a3",
            color: "#171717",
          }}
        >
          Add Article
        </Button>
      </Link>
      <AlertInfo
        err={errMissInput}
        setErr={setErrMissInput}
        severity="warning"
        content="Please fill it out completely"
      />
    </>
  );
};

export default AddArticle;
