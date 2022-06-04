import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "55% !important",
    left: "10%",
    overflow: "scroll",
    height: "100%",
    display: "block",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 4,
    boxShadow: theme.shadows[5],
  },
  closeButtonContainer: {
    textAlign: "right",
  },
  actionButtonContainer: {
    textAlign: "right",
  },
}));

export default function SimpleModal({
  isOpen,
  handleOpen,
  handleClose,
  titleText,
  body,
  subTitle,
  handleSubmit,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <div className={classes.closeButtonContainer}>
            <Button onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </Button>
          </div>
          <h2 id="simple-modal-title">{titleText?.toUpperCase()}</h2>
          <p id="simple-modal-description">{subTitle}</p>
          {body}
          <SimpleModal />
          <div className={classes.actionButtonContainer}>
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
