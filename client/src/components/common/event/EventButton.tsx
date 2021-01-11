import {Button, makeStyles, Theme} from "@material-ui/core";
import {FC} from "react";

type EventButtonProps = {
  disableRipple?: boolean,
  onClick?: () => void,
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '16px',
    textTransform: 'none',
    padding: '6px 16px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

const EventButton: FC<EventButtonProps> = ({ children, onClick }) => {
  const classes = useStyles();

  return (
    <Button className={classes.root}>
      {children}
    </Button>
  )
};

export { EventButton };
