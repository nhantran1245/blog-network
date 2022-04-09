import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "left",
  },
  title: {
    fontWeight: 450,
  },
  cardContent: {
    paddingTop: "15px",
    fontSize: "0.85rem",
  },
  cardSubtitle: {
    fontSize: "0.75rem !important",
  }
}));

export default function ResumDisplayCard({ title, subTitile, cardContent }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" component="div" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary" component="div" className={classes.cardSubtitle}>
        {subTitile}
      </Typography>
      <Typography variant="caption" component="p" className={classes.cardContent} color="textPrimary" paragraph>
        {cardContent}
      </Typography>
    </div>
  );
}
