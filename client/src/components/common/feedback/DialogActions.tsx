import React, { FC } from "react";
import MuiDialogActions, {
  DialogActionsProps as MuiDialogActionsProps,
} from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core/styles";

export type DialogActionsProps = {
  justifyContent?: React.CSSProperties["justifyContent"];
} & MuiDialogActionsProps;

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: (props: DialogActionsProps) =>
      props.justifyContent ?? "center",
    marginBottom: theme.spacing(4),
  },
}));

/**
 * Custom DialogActions component. Props are the same as MUI's API.
 *
 * Button alignment can be set from the props `justifyContent`. It has the same type
 * as flexbox's `justify-content` style.
 */
const DialogActions: FC<DialogActionsProps> = (props) => {
  const classes = useStyles(props);
  const { children } = props;

  return (
    <MuiDialogActions classes={{ root: classes.root }}>
      {children}
    </MuiDialogActions>
  );
};

export default DialogActions;
