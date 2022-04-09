import React from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import CardItem, { CardTitle } from "../../../components/CardItem/CardItem";
import { makeStyles } from "@material-ui/core/styles";
import ResumDisplayCard from "../../../components/resum-display-card/ResumDisplayCard";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineItem,
  TimelineDot,
} from "@material-ui/lab";
import LightTooltip from "./../../../components/tooltip/LightToolTip";
import CardMembershipIcon from "@material-ui/icons/CardMembership";

const useStyles = makeStyles(() => ({
  educationCard: {
    paddingLeft: "30px",
  },
  workExperienceCard: {
    paddingLeft: "30px",
  },
  paper: {
    padding: "6px 16px",
    textAlign: "left",
  },
}));

const educationList = [
  {
    place: "HCM City University of Technology",
    startTime: "Sep 2017",
    endTime: "Sep 2020",
    field: "Computer Science",
    classification: "Good",
    GPA: 7.6,
    location: "HCM City",
  },
];

const workExperienceList = [
  {
    place: "TMA Solutions",
    location: "HCM City",
    startTime: "Mar 2021",
    endTime: "Present",
    description:
      "Partner with GBST, implement wealth management system for UK customer to help asset management, investment plaforms and provident funds provide a market leading digital solution.",
    position: "Full Stack Developer",
    technology: [
      "ReactJS (Formik)",
      "Java Spring Boot (JPA, MyBatis)",
      "MS SQL",
      "Rabbit MQ",
    ],
    gainsAndRecognized: [
      "Communication and collaboration with developers form other regions.",
      "Working in a Scrum team.",
    ],
  },
  {
    place: "HCM City University of Technology",
    location: "HCM City",
    startTime: "Oct 2020",
    endTime: "Oct 2021",
    description:
      "This is my graduated essay project. Implementation an information system for Foreign Relation Department of HCMC University of Technology to manage their information and processes.",
    position: "Full Stack Developer",
    technology: [
      "ReactJS (Bootstrap 4, jQuery)",
      "NodeJS (ExpressJS)",
      "Oracle DB",
    ],
  },
  {
    place: "GeekUP",
    location: "HCM City",
    startTime: "Sep 2020",
    endTime: "Oct 2020",
    description:
      "Implement and deploy a product for new comers to get acquainted with company and for HR to manage their beginning activities.",
    position: "Full Stack Intern",
    technology: [
      "ReactJS (Ant Design, Redux Saga)",
      "NodeJS (NestJS, TypeORM)",
      "PostgreSQL",
    ],
  },
];

const certificateList = [
  {
    title: "685 Toeic Certificate",
  },
  {
    title: "JavaScript Algorithms and Data Structures, freeCodeCamp",
  },
];

export default function ResumContainer() {
  const classes = useStyles();
  const renderEducationContent = () => {
    return (
      <CardItem className={classes.educationCard}>
        <CardTitle title="EDUCATION" styles={{ marginBottom: "25px" }} />
        {educationList.map((item, index) => (
          <ResumDisplayCard
            key={index}
            cardContent={
              <Grid container>
                <Grid item xs={12}>
                  {item.field}
                </Grid>
                <Grid item xs={6}>
                  Classification: {item.classification}
                </Grid>
                <Grid item xs={6}>
                  GPA: {item.GPA}
                </Grid>
              </Grid>
            }
            title={item.place}
            subTitile={
              <Grid container>
                <Grid item xs={6}>
                  {item.startTime + " - " + item.endTime}
                </Grid>
                <Grid item xs={6}>
                  {item.location}
                </Grid>
              </Grid>
            }
          />
        ))}
      </CardItem>
    );
  };
  const renderWorkExperienceContent = () => {
    return (
      <CardItem className={classes.workExperienceCard}>
        <CardTitle title="Work Experience" />
        <Timeline align="alternate">
          {workExperienceList.map((item, index) => (
            <TimelineItem key={item.place}>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {index === 0
                    ? item.endTime
                    : workExperienceList[index - 1].startTime}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="secondary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <LightTooltip
                  title={
                    <ResumDisplayCard
                      cardContent={
                        <>
                          <Typography variant="body2" component="div" paragraph>
                            <p>{item.description}</p>
                          </Typography>
                          <Typography variant="body2" component="div" paragraph>
                            <p>Position: {item.position}</p>
                            <p>Technology: </p>
                            <ul>
                              {item.technology.map((tech) => (
                                <li key={tech}>{tech}</li>
                              ))}
                            </ul>
                          </Typography>
                        </>
                      }
                      title={item.place}
                      subTitile={
                        <Grid container>
                          <Grid item xs={6}>
                            {item.startTime + " - " + item.endTime}
                          </Grid>
                          <Grid item xs={6}>
                            {item.location}
                          </Grid>
                        </Grid>
                      }
                    />
                  }
                >
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1" paragraph>
                      {item.place}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {item.description}
                    </Typography>
                  </Paper>
                </LightTooltip>
              </TimelineContent>
            </TimelineItem>
          ))}
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {workExperienceList[workExperienceList.length - 1].startTime}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary" />
            </TimelineSeparator>
            <TimelineContent />
          </TimelineItem>
        </Timeline>
      </CardItem>
    );
  };
  const renderCertificate = () => {
    return (
      <CardItem className={classes.educationCard}>
        <CardTitle title="Certificate" styles={{ marginBottom: "25px" }} />
        <List dense={true}>
          {certificateList.map((item, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <CardMembershipIcon/>
              </ListItemAvatar>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </CardItem>
    );
  };
  return (
    <Box xs={{ flexGrow: 1 }}>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          {renderEducationContent()}
          {renderCertificate()}
        </Grid>
        <Grid item xs={8}>
          {renderWorkExperienceContent()}
        </Grid>
      </Grid>
    </Box>
  );
}
