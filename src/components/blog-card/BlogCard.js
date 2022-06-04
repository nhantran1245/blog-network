import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DefaultAvatar from "../../asset/img/default-avatar.jpg";
import { getDateText } from "./../../utils/common";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/authSlice";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    textAlign: "left",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
    fontWeight: 900,
  },
}));

export default function BlogCard({ data }) {
  const classes = useStyles();
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const isLikedByCurrentUser =
    currentUser &&
    currentUser._id &&
    data.likes.findIndex((ele) => ele.liked_by === currentUser._id) !== -1;
  const handleReadOnClick = (e) => {
    e.preventDefault();
    dispatch(push(`/blog/${data._id}`));
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={data?.createdBy?.avatar || DefaultAvatar}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data?.createdBy.fullName || ""}
        subheader={data?.createdDate ? getDateText(data.createdDate) : ""}
      />
      <CardMedia
        className={classes.media}
        image={
          data?.backgroundImage ||
          "https://v4.mui.com/static/images/cards/contemplative-reptile.jpg"
        }
        title={data.title || ""}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.title}
          noWrap
        >
          {data?.title || <br />}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon color={isLikedByCurrentUser ? "secondary" : ""} />
          &nbsp;
          <span style={{ fontSize: "0.75rem" }}>
            {data.likes.length ? data.likes.length + " " : ""}Like
          </span>
        </IconButton>
        <IconButton aria-label="read" onClick={handleReadOnClick}>
          <ImportContactsIcon />
          &nbsp;
          <span style={{ fontSize: "0.75rem" }}>Read</span>
        </IconButton>
      </CardActions>
    </Card>
  );
}
