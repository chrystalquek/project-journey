// IGNORE
import {
  Button as MuiButton,
  makeStyles,
  Theme,
  ButtonProps,
} from "@material-ui/core";
import { FC } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "16px",
    textTransform: "none",
    padding: "6px 16px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

const Button: FC<ButtonProps> = (props) => {
  const classes = useStyles();

  const { children } = props;
  return (
    <MuiButton className={classes.root} {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;
