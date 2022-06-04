import { getImgUrlFromServer } from "../../utils/common";
import { Button as MuiButton, Typography } from "@material-ui/core";
// import { grey } from "@material-ui/core/colors";
import {
  CloudUpload as MuiCloudUpload,
  Delete as MuiDelete,
} from "@material-ui/icons";
import { spacing } from "@material-ui/system";
import React, { createRef, useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import apiInstance from "../../services/axios_helper";
import defaultImg from "../../asset/img/default-img.jpg";

const Button = styled(MuiButton)(spacing);
const UploadIcon = styled(MuiCloudUpload)(spacing);
const DeleteIcon = styled(MuiDelete)(spacing);

const useStyles = makeStyles((theme) => ({
  image: {
    width: theme.spacing(50),
    height: theme.spacing(35),
    margin: "auto",
    marginBottom: "50px",
  },
}));

const CenteredContent = styled.div`
  text-align: center;
`;

// const BigAvatar = styled(Avatar)`
//   width: 120px;
//   height: 120px;
//   margin: 0 auto ${(props) => props.theme.spacing(2)}px;
//   ${({ $withBorder }) =>
//     $withBorder &&
//     `border: 1px solid ${grey[500]};
//      box-shadow: 0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]};`}
// `;

const ImageUpload = ({ defaultValue, onChangeCallBack }) => {
  const classes = useStyles();
  const [image, _setImage] = useState(defaultValue);
  const inputFileRef = createRef(null);

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };

  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  const handleOnChange = (event) => {
    const file = event.target?.files?.[0];
    const data = new FormData();
    data.append("uploadImg", file);
    apiInstance
      .post("/api/upload", data)
      .then((res) => {
        const imgUrl = getImgUrlFromServer(res.data.path);
        setImage(imgUrl);
        if (onChangeCallBack) {
          onChangeCallBack(imgUrl);
        }
      })
      .catch((err) => console.log(err));
  };

  /**
   *
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
   */
  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImage(null);
      onChangeCallBack(null);
    }
  };

  return (
    <CenteredContent>
      {/* <Avatar
        // $withBorder
        alt="Avatar"
        src={image || "/static/img/avatars/default-profile.svg"}
        imgProps={{
          style: {
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "cover",
          },
        }}
        size="large"
        className={classes.avatar}
      /> */}
      <div>
        <img
          alt="upload"
          src={image || defaultImg}
          className={classes.image}
        />
      </div>
      <Typography variant="caption" display="block" gutterBottom>
        For best quality, you should upload the image with size 3x5
      </Typography>
      <input
        ref={inputFileRef}
        accept="image/*"
        hidden
        id="avatar-image-upload"
        type="file"
        onChange={handleOnChange}
      />
      <label htmlFor="avatar-image-upload">
        <Button
          variant="contained"
          color={image ? "secondary" : "primary"}
          component="span"
          mb={2}
          onClick={handleClick}
        >
          {image ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
          {image ? "Remove" : "Upload"}
        </Button>
      </label>
    </CenteredContent>
  );
};

export default ImageUpload;
