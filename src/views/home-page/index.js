import React, { useState, useEffect } from "react";
import AppBar from "./partials/AppBar";
import { useSelector, useDispatch } from "react-redux";
import { setUser, selectUser } from "../../store/user/authSlice";
import apiInstance from "../../services/api_helper";
import { CircularProgress, Grid } from "@material-ui/core";
import ProfileColumn from "./partials/ProfileColumn";
import { makeStyles } from "@material-ui/core/styles";
import FeedColumn from "./partials/FeedColumn";
import FriendColumn from "./partials/FriendColumn";

const useStyles = makeStyles(() => ({
  root: {
    padding: "20px",
  },
  feedColumn: {
    paddingLeft: "30px !important",
  },
  friendColumn: {
    paddingLeft: "30px !important",
  }
}));
export default function HomePage() {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "USER_LOGOUT"});
  };
  useEffect(() => {
    if (!user) {
      setLoading(true);
      apiInstance
        .get("/auth/current-user")
        .then((res) => {
          console.log(res.data.user);
          dispatch(setUser(res.data.user));
        })
        .catch(() => handleLogout())
        .finally(() => setLoading(false));
    }
  }, []);
  return (
    <div className="wrapper">
      {isLoading && <CircularProgress />}
      <AppBar user={user} handleLogout={handleLogout}></AppBar>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={0} md={2}>
          <ProfileColumn user={user} />
        </Grid>
        <Grid item xs={12} md={7} className={classes.feedColumn}>
          <FeedColumn />
        </Grid>
        <Grid item xs={0} md={3} className={classes.friendColumn}>
          <FriendColumn />
        </Grid>
      </Grid>
    </div>
  );
}
