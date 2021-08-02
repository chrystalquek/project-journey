import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import Dialog from "@components/common/feedback/Dialog";
import DialogActions from "@components/common/feedback/DialogActions";
import DialogContent from "@components/common/feedback/DialogContent";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(10),
    textAlign: "center",
  },
  unrecommendedButton: {
    padding: theme.spacing(5),
    marginRight: theme.spacing(5),
    marginTop: theme.spacing(5),
    height: 30,
    backgroundColor: theme.palette.common.white,
    borderRadius: "5em",
    fontSize: "small",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "none",
  },
  recommendedButton: {
    padding: theme.spacing(5),
    marginRight: theme.spacing(5),
    marginTop: theme.spacing(5),
    backgroundColor: theme.palette.primary.main,
    height: 30,
    borderRadius: "5em",
    fontSize: "small",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "none",
  },
  popUpButton: {
    textTransform: "none",
    width: "100%",
    textAlign: "left",
  },
}));

export interface ActionableDialogProps {
  open: boolean;
  setOpen: () => void;
  content: string | JSX.Element;
  buttonOnClick: () => void;
  openCloseButtonTitle: string | JSX.Element;
  openCloseButtonStyle?: string;
  recommendedAction?: "cancel" | "other";
}

/* only for dialogs with a question + 2 buttons
(cancel on left, some other button on right thats defined by props)
*/
export function ActionableDialog(props: ActionableDialogProps) {
  const classes = useStyles();
  const {
    open,
    setOpen,
    content,
    buttonOnClick,
    openCloseButtonTitle,
    openCloseButtonStyle,
    recommendedAction,
  } = props;

  return (
    <>
      <Button
        className={classes[openCloseButtonStyle] ?? classes.recommendedButton}
        onClick={setOpen}
      >
        {openCloseButtonTitle}
      </Button>
      <Dialog
        onClose={setOpen}
        aria-labelledby="simple-dialog-title"
        open={open}
        maxWidth="sm"
      >
        <DialogContent>
          <Typography align="center">{content}</Typography>
        </DialogContent>

        <DialogActions>
          <Button
            className={
              recommendedAction === "cancel"
                ? classes.recommendedButton
                : classes.unrecommendedButton
            }
            onClick={setOpen}
          >
            Cancel
          </Button>
          <Button
            className={
              recommendedAction === "cancel"
                ? classes.unrecommendedButton
                : classes.recommendedButton
            }
            onClick={buttonOnClick}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
