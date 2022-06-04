import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import Item, { CardTitle } from "../../../components/CardItem/CardItem";

const useStyles = makeStyles(() => ({
  rightWell: {
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  objectiveText: {
    paddingTop: "16px",
  },
  informationListItem: {
    paddingLeft: 0,
  },
  skillHeader: {
    paddingLeft: "30px",
  },
}));
export default function AboutContainer() {
  const classes = useStyles();
  const defaultSkillList = [
    {
      name: "NodeJS",
      level: 3,
      readOnly: true,
    },
    {
      name: "ReactJS",
      level: 3,
      readOnly: true,
    },
    {
      name: "Java Spring Boot",
      level: 3,
      readOnly: true,
    },
    {
      name: "NestJS",
      level: 3,
      readOnly: true,
    },
    {
      name: "PHP",
      level: 3,
      readOnly: true,
    },
    {
      name: "HTML & CSS",
      level: 3,
      readOnly: true,
    },
  ];

  const renderSkillList = (item) => (
    <ListItem key={item.name}>
      <ArrowRightIcon />
      <ListItemText
        primary={item.name}
        secondary={
          <Rating
            name={item.name}
            value={item.level}
            max={5}
            readOnly={item.readOnly}
          />
        }
      />
    </ListItem>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6} md={3}>
          <Item>
            {/* <Typography
              variant="h6"
              gutterBottom
              component="h6"
              align="left"
              className={classes.skillHeader}
            >
              SKILL
            </Typography> */}
            <CardTitle title="SKILL" styles={{ paddingLeft: "30px"}}/>
            <List dense={true}>
              {defaultSkillList.map((item) => renderSkillList(item))}
            </List>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={9}>
          <Item className={classes.rightWell}>
            <CardTitle title="OBJECT" />
            <Typography
              variant="body2"
              component="div"
              align="left"
              paragraph
              className={classes.objectiveText}
            >
              I&apos;m a Full Stack Website Developer with more than 2 years
              experience and have implemented many products in several fields,
              such as: E-comerce, Information System, Service Wealth
              Management,... Besides that, I have basic knowlegde about AI, IOT
              and have ability to applied if neccessary.
            </Typography>
          </Item>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={6}>
              <Item className={classes.rightWell}>
                <CardTitle title="INFORMATION" />
                <List dense={true}>
                  <ListItem
                    key="Full Name"
                    className={classes.informationListItem}
                  >
                    <ArrowRightIcon />
                    <ListItemText
                      primary={
                        <span>
                          <b>Full Name:</b>&nbsp;&nbsp;Tran Minh Nhan
                        </span>
                      }
                    />
                  </ListItem>
                  <ListItem
                    key="Birthday"
                    className={classes.informationListItem}
                  >
                    <ArrowRightIcon />
                    <ListItemText
                      primary={
                        <span>
                          <b>Birthday:</b>&nbsp;&nbsp;23 Jan 1999
                        </span>
                      }
                    />
                  </ListItem>
                  <ListItem
                    key="Address"
                    className={classes.informationListItem}
                  >
                    <ArrowRightIcon />
                    <ListItemText
                      primary={
                        <span>
                          <b>Address:</b>&nbsp;&nbsp;Thu Duc, HCM City
                        </span>
                      }
                    />
                  </ListItem>
                  <ListItem key="Phone" className={classes.informationListItem}>
                    <ArrowRightIcon />
                    <ListItemText
                      primary={
                        <span>
                          <b>Phone:</b>&nbsp;&nbsp;+84 333 879 987
                        </span>
                      }
                    />
                  </ListItem>
                  <ListItem key="Email" className={classes.informationListItem}>
                    <ArrowRightIcon />
                    <ListItemText
                      primary={
                        <span>
                          <b>Email:</b>&nbsp;&nbsp;ssaiyan123410@gmail.com
                        </span>
                      }
                    />
                  </ListItem>
                </List>
              </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Item className={classes.rightWell}>
                <CardTitle title="SOCIAL"/>
                <List>
                  <ListItem
                    key="Facebook"
                    className={classes.informationListItem}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FacebookIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<b>Facebook:</b>}
                      secondary={
                        <a href="https://www.facebook.com/minh.nhan.k2">
                          https://www.facebook.com/minh.nhan.k2
                        </a>
                      }
                    />
                  </ListItem>
                  <ListItem
                    key="LinkedIn"
                    className={classes.informationListItem}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <LinkedInIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<b>LinkedIn:</b>}
                      secondary={
                        <a href="https://linkedin.com/in/nhan-tran-6b7432204">
                          https://linkedin.com/in/nhan-tran-6b7432204
                        </a>
                      }
                    />
                  </ListItem>
                  <ListItem
                    key="Github"
                    className={classes.informationListItem}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <GitHubIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<b>Github:</b>}
                      secondary={
                        <a href="https://https://github.com/nhantran1245">
                          https://https://github.com/nhantran1245
                        </a>
                      }
                    />
                  </ListItem>
                </List>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
