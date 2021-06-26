// IGNORE
import { Button, makeStyles, Theme, ButtonProps } from "@material-ui/core";
import { FC } from "react";

type EventButtonProps = ButtonProps;

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

export const EventButton: FC<EventButtonProps> = (props) => {
  const classes = useStyles();

  const { children } = props;
  return (
    <Button className={classes.root} {...props}>
      {children}
    </Button>
  );
};
