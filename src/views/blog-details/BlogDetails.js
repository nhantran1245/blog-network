import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import {
  CircularProgress,
  Typography,
  Grid,
  IconButton,
  ButtonGroup,
  Avatar,
  TextField,
  Chip,
} from "@material-ui/core";
import CardItem, { CardTitle } from "../../components/CardItem/CardItem";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import DefaultImg from "../../asset/img/default-img.jpg";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/authSlice";
import { selectBlogStore } from "../../store/blog/blogSlice";
import { AccountCircle } from "@material-ui/icons";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  containerGrid: {
    padding: "0 30px",
  },
  card: {
    padding: "10px 50px !important",
  },
  backgroundImage: {
    height: "350px",
    backgroundColor: "#cccccc",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
  },
  blogContent: {
    textAlign: "left",
    paddingTop: "35px",
  },
  avatarContainer: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    margin: "auto",
  },
  commentContainer: {
    marginTop: "30px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
    "& .MuiChip-outlined": {
      width: "100%",
      justifyContent: "left",
    },
  },
}));
export default function BlogDetails() {
  const classes = useStyles();
  const { id } = useParams();
  const currentUser = useSelector(selectUser);
  const {
    currentBlog: blogDetails,
    error,
    isLoading,
  } = useSelector(selectBlogStore);
  const dispatch = useDispatch();
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(false);
  const commentRef = useRef();

  useEffect(() => {
    dispatch({ type: "GET_BLOG_DETAILS", payload: { id } });
  }, [id]);

  useEffect(() => {
    setIsLikedByCurrentUser(
      currentUser &&
        currentUser._id &&
        blogDetails.likes &&
        blogDetails.likes.findIndex(
          (ele) => ele.liked_by._id == currentUser._id
        ) !== -1
    );
  }, [blogDetails]);

  const handleLikeClick = () => {
    if (!isLikedByCurrentUser) {
      dispatch({ type: "LIKE_BLOG", payload: { id } });
    } else {
      dispatch({ type: "UNLIKE_BLOG", payload: { id } });
    }
  };

  const renderCommentList = () => {
    const { comments } = blogDetails;
    if (comments && comments.length > 0) {
      return (
        <div className={classes.commentContainer}>
          {comments.map((item, index) => (
            <Chip
              avatar={
                <Avatar
                  alt={<AccountCircle />}
                  src={item.commented_by?.avatar}
                />
              }
              label={item.text}
              variant="outlined"
              color={index%2 === 0 ? "primary" : "secondary"}
              key={index}
              item={item}
            />
          ))}
        </div>
      );
    }
  };

  const handleAddCommentClick = (e) => {
    e.preventDefault();
    if (commentRef.current.value) {
      const payload = {
        id,
        payload: {
          comment: commentRef.current.value,
        },
      };
      dispatch({ type: "ADD_COMMENT", payload });
      commentRef.current.value = "";
    }
  };
  return (
    <div>
      {isLoading && <CircularProgress />}
      {error && (
        <Alert severity="error" style={{ marginBottom: "20px" }}>
          {error}
        </Alert>
      )}
      <div
        className={classes.backgroundImage}
        style={{
          backgroundImage: `url("${
            blogDetails.backgroundImage || DefaultImg
          }")`,
        }}
      ></div>
      <Grid container spacing={2} className={classes.containerGrid}>
        <Grid item xs={12} md={8}>
          <CardItem className={classes.card}>
            <CardTitle title={blogDetails.title}></CardTitle>
            <Typography component="div" className={classes.blogContent}>
              <div
                dangerouslySetInnerHTML={{
                  __html: blogDetails.content,
                }}
              />
            </Typography>
          </CardItem>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardItem>
            <ButtonGroup>
              <IconButton
                aria-label="add to favorites"
                onClick={handleLikeClick}
              >
                <FavoriteIcon color={isLikedByCurrentUser ? "secondary" : ""} />
                &nbsp;
                <span style={{ fontSize: "0.75rem" }}>
                  {blogDetails.likes?.length
                    ? blogDetails.likes.length + " "
                    : ""}
                  Like
                </span>
              </IconButton>
              <IconButton aria-label="add to favorites">
                <ChatIcon color="primary" />
                &nbsp;
                <span style={{ fontSize: "0.75rem" }}>
                  {blogDetails.comments?.length
                    ? blogDetails.comments.length + " "
                    : ""}
                  Comment
                </span>
              </IconButton>
            </ButtonGroup>
            <form onSubmit={handleAddCommentClick}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <Avatar
                    alt={<AccountCircle />}
                    src={currentUser?.avatar}
                    className={classes.avatarContainer}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label="Comment"
                    placeholder="Your comment"
                    color="primary"
                    inputRef={commentRef}
                    fullWidth
                    multiline
                    rows={1}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    aria-label="add to favorites"
                    color="primary"
                    disabled={isLoading}
                    type="submit"
                  >
                    <SendIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </form>
            {renderCommentList()}
          </CardItem>
        </Grid>
      </Grid>
    </div>
  );
}
