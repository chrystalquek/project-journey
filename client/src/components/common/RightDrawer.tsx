import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Drawer } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "80%",
    padding: theme.spacing(4),
    paddingTop: theme.spacing(10),
  },
}));

type RightDrawerProps = {
  buttonTitle: JSX.Element;
  content: JSX.Element;
};

const RightDrawer: FC<RightDrawerProps> = ({ buttonTitle, content }) => {
  const classes = useStyles();

  const [rightDrawerOpen, setRightDrawerOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setRightDrawerOpen(!rightDrawerOpen)}>
        {buttonTitle}
      </Button>
      <Drawer
        classes={{
          paper: classes.drawer,
        }}
        anchor="right"
        open={rightDrawerOpen}
        onClose={() => setRightDrawerOpen(false)}
      >
        {content}
      </Drawer>
    </>
  );
};

export default RightDrawer;
