import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AvatarUpload from "../../../components/avatar-upload/AvatarUpload";
import { ButtonGroup, Button, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import apiInstance from "../../../services/api_helper";

export default function Step3Form({
  classes,
  handlePrevClickCallBack,
  userInfo,
  stepSave,
  userId,
  setLoading,
}) {
  const [error, setError] = useState("");
  const history = useHistory();
  const handleImageChangeCallBack = (value) => {
    stepSave({ avatar: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    apiInstance
      .put(`/api/users/${userId}`, null, userInfo)
      .then(() => history.push("/login"))
      .catch((err) => setError(err.response.data.message))
      .finally(() => setLoading(false))
    console.log(userInfo, userId);
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {error !== "" && (
        <Alert severity="error" style={{ marginBottom: "20px" }}>
          {error}
        </Alert>
      )}
      <AvatarUpload
        defaultValue={userInfo && userInfo.image ? userInfo.image : null}
        onChangeCallBack={handleImageChangeCallBack}
      />
      <Grid item xs={12} className={classes.buttonGroupDiv}>
        <ButtonGroup
          color="secondary"
          aria-label="contained secondary button group"
          variant="contained"
        >
          <Button onClick={handlePrevClickCallBack}>Prev</Button>
          <Button type="submit">Submit</Button>
        </ButtonGroup>
      </Grid>
    </form>
  );
}
