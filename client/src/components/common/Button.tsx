// IGNORE
import {
  Button as MuiButton,
  makeStyles,
  Theme,
  ButtonProps,
} from "@material-ui/core";
import { FC } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  base: {
    borderRadius: "16px",
    textTransform: "none",
    padding: "6px 16px",
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  secondary: {
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

type Props = ButtonProps & {
  secondary?: boolean;
};

const Button: FC<Props> = ({
  className,
  secondary,
  children,
  ...restProps
}) => {
  const classes = useStyles();
  const buttonClassName = !secondary
    ? `${classes.base} ${classes.primary}`
    : `${classes.base} ${classes.secondary}`;

  return (
    <MuiButton
      className={
        className ? `${buttonClassName} ${className}` : buttonClassName
      }
      {...restProps}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
