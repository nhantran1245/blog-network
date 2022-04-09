import React from "react";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import CardItem, { CardTitle } from "../../../components/CardItem/CardItem";
import { makeStyles } from "@material-ui/core/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import Editor from "../../../components/ckeditor/Editor";

const useStyles = makeStyles((theme) => ({
  rightSideCard: {
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingBottom: "20px",
  },
  contactForm: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
    "& .MuiInput-input": {
      backgroundColor: "#fff",
    }
  },
}));

export default function ContactContainer() {
  const classes = useStyles();
  const renderContactInformation = () => {
    return (
      <CardItem>
        <CardTitle title="INFORMATION" styles={{ paddingLeft: "30px" }} />
        <List dense={true}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocationOnIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Location"
              secondary="5/6/11 Le Van Chi Str, Thu Duc City"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <EmailIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Email" secondary="ssaiyan123410@gmail.com" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PhoneIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Phone" secondary="+84 333 879 987" />
          </ListItem>
        </List>
      </CardItem>
    );
  };
  const renderMessageForm = () => {
    return (
      <CardItem className={classes.rightSideCard}>
        <CardTitle title="CONTACT ME" styles={{ paddingLeft: "16px" }} />
        <form className={classes.contactForm} noValidate autoComplete="off">
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <TextField
                required
                id="standard-required"
                label="Name"
                defaultValue="Hello World"
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="standard-required"
                label="Email"
                type="email"
                defaultValue="Hello World"
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" component="div" align="left">
                Message
              </Typography>
              <Editor />
            </Grid>
          </Grid>
        </form>
      </CardItem>
    );
  };
  return (
    <Grid container spacing={5}>
      <Grid item xs={5}>
        {renderContactInformation()}
      </Grid>
      <Grid item xs={7}>
        {renderMessageForm()}
      </Grid>
    </Grid>
  );
}
