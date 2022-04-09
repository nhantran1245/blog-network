import React from "react";
import Paper from "@material-ui/core/Paper";
import { styled, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
export default styled(Paper)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  marginTop: "30px",
}));

const useStyles = styles => makeStyles({
  title: {
    fontWeight: 800,
    ...styles,
  },
});
export const CardTitle = ({ title, styles }) => {
  const classes = useStyles(styles)();
  return (
    <Typography
      variant="h6"
      gutterBottom
      component="h6"
      align="left"
      color="primary"
      className={classes.title}
    >
      {title.toUpperCase()}
    </Typography>
  );
};
