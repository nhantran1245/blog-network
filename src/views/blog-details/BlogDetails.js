import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  CircularProgress,
  Typography,
  Grid,
  IconButton,
  ButtonGroup,
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

const useStyles = makeStyles(() => ({
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
}));
export default function BlogDetails() {
  const classes = useStyles();
  const { id } = useParams();
  const currentUser = useSelector(selectUser);
  const { currentBlog: blogDetails, error, isLoading } = useSelector(selectBlogStore);
  const dispatch = useDispatch();
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(false);

  useEffect(() => {
    dispatch({ type: "GET_BLOG_DETAILS", payload: { id }});
  }, [id]);
  
  useEffect(() => {
    console.log("call");
    console.log(blogDetails);
    setIsLikedByCurrentUser(currentUser && currentUser._id && blogDetails.likes &&
      blogDetails.likes.findIndex((ele) => ele.liked_by._id == currentUser._id) !== -1)
  }, [blogDetails])

  const handleLikeClick = () => {
    if (!isLikedByCurrentUser) {
      dispatch({ type: "LIKE_BLOG", payload: { id }});
    } else {
      dispatch({ type: "UNLIKE_BLOG", payload: { id }});
    }
  }
  return (
    <div>
      {isLoading && <CircularProgress />}
      {error !== "" && (
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
              <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
                <FavoriteIcon color={isLikedByCurrentUser ? "secondary" : ""}/>
                &nbsp;
                <span style={{ fontSize: "0.75rem" }}>
                  {blogDetails.likes?.length
                    ? blogDetails.likes.length + " "
                    : ""}
                  Like
                </span>
              </IconButton>
              <IconButton aria-label="add to favorites">
                <ChatIcon />
                &nbsp;
                <span style={{ fontSize: "0.75rem" }}>
                  {blogDetails.comments?.length
                    ? blogDetails.comments.length + " "
                    : ""}
                  Comment
                </span>
              </IconButton>
            </ButtonGroup>
          </CardItem>
        </Grid>
      </Grid>
    </div>
  );
}
