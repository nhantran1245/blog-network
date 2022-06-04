import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import profile from "../../asset/img/avatar.jpg";
import Typography from "@material-ui/core/Typography";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import PersonIcon from "@material-ui/icons/Person";
import BookIcon from "@material-ui/icons/Book";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Container } from "@material-ui/core";
import AboutContainer from "./partials/AboutContainer";
import ResumContainer from "./partials/ResumContainer";
import ContactContainer from "./partials/ContactContainer";
import BlogContainer from "./partials/BlogContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f5f5f5",
    paddingTop: "35px",
    borderRadius: "0 0 15px 15px",
  },
  avatar: {
    width: theme.spacing(35),
    height: theme.spacing(35),
    margin: "auto",
  },
  title: {
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: "30px",
  },
  contentTabPanel: {
    width: "70%",
    borderRadius: "15px",
    margin: "auto",
  },
}));

export default function ProfileSection() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);
  const handleOnChangeTabs = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const renderTabContent = () => {
    if (currentTab == 0) {
      return <AboutContainer />;
    } else if (currentTab == 1) {
      return <ResumContainer />;
    } else if (currentTab == 2) {
      return <></>;
    } else if (currentTab == 3) {
      return <ContactContainer />;
    } else if (currentTab == 4) {
      return <BlogContainer />;
    } else {
      return null;
    }
  };
  return (
    <div>
      <div className={classes.root}>
        <Avatar
          alt="Nhan Tran"
          src={profile}
          size="large"
          className={classes.avatar}
        ></Avatar>
        <Typography className={classes.title} variant="h3" component="h3">
          Nhan Tran
        </Typography>
        <Typography
          className={classes.title}
          variant="subtitle1"
          gutterBottom
          component="div"
        >
          Full Stack Developer
        </Typography>
        <Tabs
          value={currentTab}
          onChange={handleOnChangeTabs}
          indicatorColor="primary"
          textColor="primary"
          aria-label="icon label tabs example"
          centered
        >
          <Tab icon={<PersonIcon />} label="ABOUT"></Tab>
          <Tab icon={<InsertDriveFileIcon />} label="RESUME" />
          <Tab icon={<FavoriteIcon />} label="FAVORITES" />
          <Tab icon={<PhoneIcon />} label="CONTACT" />
          <Tab icon={<BookIcon />} label="BLOGS" />
        </Tabs>
      </div>
      <Container className={classes.contentContainer}>
        {renderTabContent()}
      </Container>
    </div>
  );
}
