import { FC } from "react";
import MuiDialogTitle, {
  DialogTitleProps as MuiDialogTitleProps,
} from "@material-ui/core/DialogTitle";

export type DialogContentTitleProps = MuiDialogTitleProps;

const DialogContentText: FC<DialogContentTitleProps> = (props) => {
  const { children } = props;

  return <MuiDialogTitle {...props}>{children}</MuiDialogTitle>;
};

DialogContentText.defaultProps = {
  color: "textPrimary",
};

export default DialogContentText;
