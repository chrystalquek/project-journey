import { FC } from "react";
import MuiDialog, {
  DialogProps as MuiDialogProps,
} from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { useIsMobile } from "@utils/helpers/layout";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export type DialogProps = MuiDialogProps;

/**
 * Custom Dialog component. Props are the same as MUI's API.
 *
 * API Link: [Here](https://material-ui.com/api/dialog)
 *
 * Usage example:
 *
 * ```
 * <Dialog>
 *   <DialogTitle>Your title</DialogTitle>
 *   <DialogContent>
 *     <DialogContentText>Your para 1</DialogContentText>
 *     <DialogContentText>Your para 2</DialogContentText>
 *   </DialogContent>
 *   <DialogActions>
 *     Your buttons here
 *   </DialogActions>
 * </Dialog>
 * ```
 */
const Dialog: FC<DialogProps> = (props) => {
  // Black colour with 50% alpha
  const ICON_COLOUR = "#00000080";
  const classes = useStyles();
  const isMobile = useIsMobile();

  const { onClose, children } = props;
  return (
    <MuiDialog
      fullScreen={isMobile}
      {...props}
      classes={{ paper: classes.root }}
    >
      <Box display="flex" justifyContent="flex-end">
        {/* Not sure whether this is a good practice */}
        <IconButton size="small" onClick={() => onClose({}, "backdropClick")}>
          <Box color={ICON_COLOUR}>
            <CloseIcon color="inherit" />
          </Box>
        </IconButton>
      </Box>
      <Box px={6}>{children}</Box>
    </MuiDialog>
  );
};

Dialog.defaultProps = {
  maxWidth: "md",
  fullWidth: true,
};

export default Dialog;
