import React, { useRef, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Grid, TextField, ButtonGroup, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardItem from "../../components/CardItem/CardItem";
import Alert from "@material-ui/lab/Alert";
import { useDispatch } from "react-redux";

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
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const validateUserName = (value) => {
    const regex = /^[a-zA-Z][a-zA-Z0-9]+$/;
    return regex.test(value);
  };

  const validatePassword = (value) => {
    const regex = /^[a-zA-Z0-9!@#$%^&*]+$/;
    return regex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userName = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (userName.length < 8 || userName.length > 24) {
      setError("Username must have length beetwen 8 and 24");
    } else if (!validateUserName(userName)) {
      setError(
        "Username must only contain numbers or letters, and must start with letter"
      );
    } else if (password.length < 8 || password.length > 32) {
      setError("Password must have length beetwen 8 and 32");
    } else if (!validatePassword(password)) {
      setError(
        "Password must only contain numbers letters, or special characters"
      );
    } else {
      const payload = {
        username: userName,
        password: password,
      };
      dispatch({ type: "USER_LOGIN", payload });
      setError("");
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container className={classes.formContainer}>
        <CardItem>
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
              <Grid item xs={12} className={classes.buttonGroupDiv}>
                <ButtonGroup
                  color="secondary"
                  aria-label="contained secondary button group"
                  variant="contained"
                >
                  <Button type="submit">Login</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </form>
        </CardItem>
      </Container>
    </div>
  );
}
