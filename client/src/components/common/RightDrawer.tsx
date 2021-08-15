import { FC, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Drawer } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "fit-content",
    minWidth: "50%",
    padding: theme.spacing(4),
    paddingTop: theme.spacing(10),
  },
  button: {
    background: "none",
    textTransform: "none",
    color: theme.palette.secondary.main,
    textDecoration: "underline",
    cursor: "pointer",
    "&:hover": {
      background: "none",
      textDecoration: "underline",
    },
  },
}));

type RightDrawerProps = {
  buttonTitle: JSX.Element;
  content: JSX.Element;
  handleApplyFilter?: () => void;
};

const RightDrawer: FC<RightDrawerProps> = ({
  buttonTitle,
  content,
  handleApplyFilter,
}) => {
  const classes = useStyles();

  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

  return (
    <>
      <Button
        className={classes.button}
        onClick={() => setRightDrawerOpen(!rightDrawerOpen)}
      >
        {buttonTitle}
      </Button>
      <Drawer
        classes={{
          paper: classes.drawer,
        }}
        anchor="right"
        open={rightDrawerOpen}
        onClose={() => {
          setRightDrawerOpen(false);
          if (handleApplyFilter) {
            handleApplyFilter();
          }
        }}
      >
        {content}
      </Drawer>
    </>
  );
};

export default RightDrawer;
