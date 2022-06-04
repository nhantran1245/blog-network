import React, { useState, useRef, useEffect } from "react";
import CardItem from "../../../components/CardItem/CardItem";
import { makeStyles } from "@material-ui/core/styles";
import BlogCard from "./../../../components/blog-card/BlogCard";
import {
  Grid,
  ButtonGroup,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import Modal from "../../../components/modal/Modal";
import Editor from "../../../components/ckeditor/Editor";
import ImageUpload from "../../../components/image-upload/ImageUpload";
import { useSelector, useDispatch } from "react-redux";
import { selectBlogs } from "../../../store/blog/blogSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "500px",
    padding: "0 50px",
  },
  buttonGroupDiv: {
    textAlign: "right",
    marginTop: "10px",
    marginBottom: "10px",
  },
  singleLineBlogCardContainer: {
    width: "70%",
    margin: "auto",
    "& .MuiCard-root": {
      maxWidth: "none",
    },
    marginBottom: "20px",
  },
}));
const VIEW_TYPE = {
  group: 1,
  headline: 2,
};
export default function FeedColumn() {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [viewType, setViewType] = useState(VIEW_TYPE.group);
  const [isOpenModal, setOpenModal] = useState(false);
  const [editorValue, setEditorValue] = useState(null);
  const [blogBackGround, setBlogBackGround] = useState(null);
  const blogTitleRef = useRef();
  const dispatch = useDispatch();
  const renderBlogList = () => {
    if (viewType === VIEW_TYPE.group) {
      return blogList.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item._id}>
          <BlogCard data={item} />
        </Grid>
      ));
    } else {
      return blogList.map((item) => (
        <div className={classes.singleLineBlogCardContainer} key={item._id}>
          <BlogCard data={item} />
        </div>
      ));
    }
  };
  const changeViewType = (e, viewType) => {
    e.preventDefault();
    setViewType(viewType);
  };
  const handleOpenAddModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };
  const handleCloseAddModal = (e) => {
    e.preventDefault();
    setOpenModal(false);
  };
  const onEditorChangeCallBack = (value) => {
    setEditorValue(value);
  };
  const onModalSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: blogTitleRef.current.value,
      backgroundImage: blogBackGround,
      content: editorValue,
    };
    dispatch({ type: "CREATE_BLOG", payload });
    setOpenModal(false);
    setLoading(false)
    // apiInstance
    //   .post("/api/blog", null, payload)
    //   .then((res) => {
    //     console.log(res.data);
    //     dispatch(loadMoreBlog([res.data]));
    //     setOpenModal(false);
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => setLoading(false));
  };
  const BlogForm = (
    <form>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <ImageUpload
            onChangeCallBack={(value) => setBlogBackGround(value)}
            defaultValue={blogBackGround}
          />
          <TextField
            id="title"
            label="Title"
            multiline
            color="secondary"
            inputRef={blogTitleRef}
            fullWidth
            rows={2}
          />
          <Editor onChangeCallback={onEditorChangeCallBack} />
        </Grid>
      </Grid>
    </form>
  );

  const blogList = useSelector(selectBlogs);
  useEffect(() => {
    if (!blogList || blogList.length === 0) {
      setLoading(true);
      dispatch({ type: "LOAD_MORE_BLOGS" });
      setLoading(false);
      // apiInstance
      //   .get("/api/blog/6/1")
      //   .then((res) => {
      //     console.log(res.data.data);
      //     dispatch(loadMoreBlog(res.data.data));
      //   })
      //   .catch((err) => console.log(err))
      //   .finally(() => setLoading(false));
    }
  }, []);

  return (
    <CardItem className={classes.root}>
      {isLoading && <CircularProgress />}
      <div className={classes.buttonGroupDiv}>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
          className={classes.buttonGroupDiv}
        >
          <Button aria-label="delete">
            <ViewHeadlineIcon
              fontSize="medium"
              onClick={(e) => changeViewType(e, VIEW_TYPE.headline)}
            />
          </Button>
          <Button
            aria-label="delete"
            onClick={(e) => changeViewType(e, VIEW_TYPE.group)}
          >
            <ViewComfyIcon fontSize="medium" />
          </Button>
          <Button aria-label="delete" onClick={(e) => handleOpenAddModal(e)}>
            <AddIcon fontSize="medium" />
          </Button>
        </ButtonGroup>
      </div>

      <Grid container spacing={2}>
        {renderBlogList()}
      </Grid>
      <Modal
        isOpen={isOpenModal}
        handleOpen={handleOpenAddModal}
        handleClose={handleCloseAddModal}
        handleSubmit={onModalSubmit}
        titleText="Add New Blog"
        subTitle="New Blog will be written by below form"
        body={BlogForm}
      />
    </CardItem>
  );
}
