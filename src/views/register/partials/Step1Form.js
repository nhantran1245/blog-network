import React, { useRef, useState } from "react";
import { Grid, ButtonGroup, Button, TextField } from "@material-ui/core";
import {
  validateName,
  validateUserName,
  validatePassword,
} from "../../../utils/common";
import Alert from "@material-ui/lab/Alert";
import apiInstance from "../../../services/api_helper";

export default function Step1Form({
  classes,
  handleNextClickCallBack,
  setUserId,
  setLoading,
}) {
  const [error, setError] = useState("");
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value;
    if (!validateName(firstName)) {
      setError("First Name should contain only letter");
    } else if (!validateName(lastName)) {
      setError("Last Name should contain only letter");
    } else if (username.length < 8 || username.length > 24) {
      setError("Username must have length beetwen 8 and 24");
    } else if (!validateUserName(username)) {
      setError(
        "Username must only contain numbers or letters, and must start with letter"
      );
    } else if (password.length < 8 || password.length > 32) {
      setError("Password must have length beetwen 8 and 32");
    } else if (!validatePassword(password)) {
      setError(
        "Password must only contain numbers letters, or special characters"
      );
    } else if (password !== confirmPassword) {
      setError("Confirm password incorrect");
    } else {
      const payload = {
        firstName,
        lastName,
        username,
        password,
      };
      setLoading(true);
      apiInstance
        .post("/auth/register", null, payload)
        .then((res) => {
          setError("");
          setUserId(res.data._doc._id);
          handleNextClickCallBack();
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setError(err.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
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
        <Grid item xs={6}>
          <TextField
            required
            id="standard-required"
            label="First Name"
            placeholder="Your First Name"
            fullWidth
            color="secondary"
            variant="filled"
            inputRef={firstNameRef}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="standard-required"
            label="Last Name"
            placeholder="Your Last Name"
            fullWidth
            color="secondary"
            variant="filled"
            inputRef={lastNameRef}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="username"
            label="Username"
            placeholder="Username"
            fullWidth
            color="secondary"
            variant="filled"
            inputRef={usernameRef}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            type="password"
            id="password"
            label="Password"
            placeholder="Password"
            fullWidth
            color="secondary"
            variant="filled"
            inputRef={passwordRef}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Password"
            fullWidth
            color="secondary"
            variant="filled"
            inputRef={confirmPasswordRef}
          />
        </Grid>
        <Grid item xs={12} className={classes.buttonGroupDiv}>
          <ButtonGroup
            color="secondary"
            aria-label="contained secondary button group"
            variant="contained"
          >
            <Button type="submit">Next</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </form>
  );
}
