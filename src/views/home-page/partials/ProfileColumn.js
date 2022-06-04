import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import EmailIcon from "@material-ui/icons/Email";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Avatar, makeStyles } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import PersonIcon from "@material-ui/icons/Person";
import CakeIcon from "@material-ui/icons/Cake";
import PhoneIcon from "@material-ui/icons/Phone";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getDateText, getPhoneText } from "./../../../utils/common";
import HomeIcon from "@material-ui/icons/Home";
import CardItem from "../../../components/CardItem/CardItem";

const useStyles = makeStyles((theme) => ({
  avatarContainer: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: "auto",
  },
  list: {
    width: "100%",
    "& .MuiListItemText-primary": {
      wordWrap: "break-word",
    },
  },
}));

export default function ProfileColumn({ user }) {
  const [expand, setExpand] = React.useState(false);
  const classes = useStyles();
  return (
    <CardItem>
      <Avatar
        alt={<AccountCircle />}
        src={user?.avatar}
        className={classes.avatarContainer}
        size="large"
      />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.list}
      >
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={user?.fullName} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CakeIcon />
          </ListItemIcon>
          <ListItemText
            primary={user?.birthDate ? getDateText(user.birthDate) : "Empty"}
          />
        </ListItem>
        <ListItem button onClick={() => setExpand(!expand)}>
          {/* <ListItemIcon>
            <ExpandMoreIcon />
          </ListItemIcon> */}
          <ListItemText primary={expand ? "Show Less" : "Show more"} />
          {expand ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={expand} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary={user?.email ? user.email : "Empty"} />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText
                primary={user?.phone ? getPhoneText(user.phone) : "Empty"}
              />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={user?.address ? user.address : "Empty"} />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </CardItem>
  );
}
