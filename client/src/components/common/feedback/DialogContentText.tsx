import { FC } from "react";
import MuiDialogContentText, {
  DialogContentTextProps as MuiDialogContentTextProps,
} from "@material-ui/core/DialogContentText";

export type DialogContentTextProps = MuiDialogContentTextProps;

const DialogContentText: FC<any> = (props) => {
  const { children } = props;

  return <MuiDialogContentText {...props}>{children}</MuiDialogContentText>;
};

DialogContentText.defaultProps = {
  color: "textPrimary",
};

export default DialogContentText;
