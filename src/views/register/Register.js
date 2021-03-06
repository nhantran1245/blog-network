import React, { useState } from "react";
import { useHistory  } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import CardItem from "../../components/CardItem/CardItem";
import Step1Form from "./partials/Step1Form";
import Step2Form from "./partials/Step2Form";
import Step3Form from "./partials/Step3Form";
import LinearProgress from "@material-ui/core/LinearProgress";

const defaultUser = {
  fullName: "",
  gender: "",
  birthDate: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: "100px 0",
    backgroundColor: "#cfe8fc",
    minHeight: "100vh",
  },
  formContainer: {
    width: "30%",
    margin: "auto",
    "& .Mui-disabled": {
      color: "#f50057",
    },
  },
  form: {
    padding: "20px",
    textAlign: "left",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  buttonGroupDiv: {
    textAlign: "right",
    marginTop: "20px",
  },
  genderRadioGroup: {
    paddingLeft: "10px",
  },
  birthDateField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  formLabel: {
    paddingLeft: "8px",
    marginBottom: 0,
  },
}));
export default function Register() {
  const classes = useStyle();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(defaultUser);
  const history = useHistory();
  const marks = [
    {
      value: 1,
      label: "Step 1",
    },
    {
      value: 2,
      label: "Step 2",
    },
    {
      value: 3,
      label: "Step 3",
    },
  ];
  const handleNextClick = () => {
    setStep(step + 1);
  };
  const handlePrevClick = () => {
    setStep(step - 1);
  };
  const stepSave = (payload) => {
    setUserInfo({ ...userInfo, ...payload });
  };
  const handleSkipClickCallBack = () => {
    history.push("/login");
  };

  const renderStepForm = () => {
    if (step === 1) {
      return (
        <Step1Form
          classes={classes}
          handleNextClickCallBack={handleNextClick}
          handleSkipClickCallBack={handleSkipClickCallBack}
          setLoading={setLoading}
          setUserId={setUserId}
        />
      );
    } else if (step === 2) {
      return (
        <Step2Form
          classes={classes}
          handleNextClickCallBack={handleNextClick}
          handlePrevClickCallBack={handlePrevClick}
          setLoading={setLoading}
          userId={userId}
          stepSave={stepSave}
          userInfo={userInfo}
          handleSkipClickCallBack={handleSkipClickCallBack}
        />
      );
    } else if (step === 3) {
      return (
        <Step3Form
          classes={classes}
          handlePrevClickCallBack={handlePrevClick}
          setLoading={setLoading}
          stepSave={stepSave}
          userInfo={userInfo}
          userId={userId}
          handleSkipClickCallBack={handleSkipClickCallBack}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container className={classes.formContainer}>
        <Slider
          min={1}
          max={3}
          step={1}
          marks={marks}
          valueLabelDisplay="on"
          disabled
          value={step}
        />
        <CardItem>
          {renderStepForm()}
          {loading && <LinearProgress color="secondary" />}
        </CardItem>
      </Container>
    </div>
  );
}
