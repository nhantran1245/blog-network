import React from "react";
import { Grid, ButtonGroup, Button, TextField } from "@material-ui/core";

export default function Step3Form({ classes, handleNextClickCallBack, handlePrevClickCallBack}) {
  return (
    <form className={classes.form}>
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
          />
        </Grid>
        <Grid item xs={12} className={classes.buttonGroupDiv}>
          <ButtonGroup
            color="secondary"
            aria-label="contained secondary button group"
            variant="contained"
          >
            <Button onClick={handlePrevClickCallBack}>Prev</Button>
            <Button>Skip</Button>
            <Button>Finish</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </form>
  );
}
