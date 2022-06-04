import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  ButtonGroup,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  FormLabel,
} from "@material-ui/core";
import PhoneField from "../../../components/phone-field/PhoneField";
import { validateFullName, validatePhone } from "./../../../utils/common";
import { Alert } from "@material-ui/lab";

export default function Step2Form({
  classes,
  handleNextClickCallBack,
  stepSave,
  userInfo,
  handleSkipClickCallBack,
}) {
  const fullNameRef = useRef();
  const birthDateRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const [gender, setGender] = useState("female");
  const [phone, setPhone] = useState(null);
  const [error, setError] = useState("");
  const handleChange = (event) => {
    setGender(event.target.value);
  };

  useEffect(() => {
    fullNameRef.current.value =
      userInfo && userInfo.fullName ? userInfo.fullName : null;
    birthDateRef.current.value =
      userInfo && userInfo.birthDate ? userInfo.birthDate : null;
    emailRef.current.value = userInfo && userInfo.email ? userInfo.email : null;
    addressRef.current.value =
      userInfo && userInfo.address ? userInfo.address : null;
    userInfo && userInfo.gender && setGender(userInfo.gender);
    userInfo && userInfo.phone && setPhone(userInfo.phone);
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullName = fullNameRef.current.value.trim();
    const birthDate = birthDateRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const address = addressRef.current.value.trim();
    if (!validateFullName(fullName)) {
      setError("Your full name is invalid");
    } else if (phone && !validatePhone(phone)) {
      setError("Your phone is invalid");
    } else {
      stepSave({ fullName, birthDate, email, gender, phone, address });
      handleNextClickCallBack();
    }
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {error !== "" && (
        <Alert severity="error" style={{ marginBottom: "20px" }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            required
            id="standard-required"
            label="Full Name"
            placeholder="Your Full Name"
            fullWidth
            color="secondary"
            inputRef={fullNameRef}
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "15px" }}>
          <FormLabel component="label" className={classes.formLabel}>
            Gender
          </FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={gender}
            row
            onChange={handleChange}
            className={classes.genderRadioGroup}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "15px" }}>
          <FormLabel component="label" className={classes.formLabel}>
            Birth Date *
          </FormLabel>
          <TextField
            id="date"
            type="date"
            defaultValue="2000-01-01"
            className={classes.birthDateField}
            color="secondary"
            inputRef={birthDateRef}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "15px" }}>
          <FormLabel component="label" className={classes.formLabel}>
            Phone
          </FormLabel>
          <PhoneField
            onChangeCallBack={(value) => setPhone(value)}
            value={phone}
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "15px" }}>
          <TextField
            id="date"
            label="Email"
            type="email"
            color="secondary"
            inputRef={emailRef}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "15px" }}>
          <TextField
            id="date"
            label="Address"
            multiline
            color="secondary"
            inputRef={addressRef}
            fullWidth
            rows={2}
          />
        </Grid>
        <Grid item xs={12} className={classes.buttonGroupDiv}>
          <ButtonGroup
            color="secondary"
            aria-label="contained secondary button group"
            variant="contained"
          >
            <Button onClick={handleSkipClickCallBack}>Skip</Button>
            <Button type="submit">Next</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Alert severity="success" style={{marginTop: "20px"}}>
        User Account has been created successfully! <br/>
        You can skip this 2 steps and login with new account.
      </Alert>
    </form>
  );
}
