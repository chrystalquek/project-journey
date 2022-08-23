import { FC } from "react";
import Box from "@material-ui/core/Box";
import MuiDialogContent, {
  DialogContentProps as MuiDialogContentProps,
} from "@material-ui/core/DialogContent";

export type DialogContentProps = MuiDialogContentProps;

const DialogContent: FC<DialogContentProps> = (props) => {
  const { children } = props;

  return (
    <Box mb={4}>
      <MuiDialogContent>{children}</MuiDialogContent>
    </Box>
  );
};

export default DialogContent;
