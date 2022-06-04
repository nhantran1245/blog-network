import React from "react";
import CardItem, { CardTitle } from "../../../components/CardItem/CardItem";
import Editor from "../../../components/ckeditor/Editor";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  blogCardItem: {
    width: "70%",
    margin: "auto",
  },
}));

export default function BlogContainer() {
  const classes = useStyles();
  return (
    <CardItem className={classes.blogCardItem}>
      <CardTitle title="Blogs" />
      <Editor className={classes.editor} />
    </CardItem>
  );
}
