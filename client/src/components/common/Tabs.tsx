import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  clickedButton: {
    padding: theme.spacing(5),
    margin: theme.spacing(5),
    backgroundColor: theme.palette.primary.main,
    height: 30,
    width: 150,
    borderRadius: '5em',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  otherButton: {
    padding: theme.spacing(5),
    margin: theme.spacing(5),
    height: 30,
    width: 150,
    borderRadius: '5em',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
}));

interface Tab {
    label: string;
    onClick: () => void;
}

export interface TabsProps {
    tabs: Array<Tab>
    clickedOn: number
}

// all tabs are white with boxshadow. currently pressed button (indicated by clickedOn) is green.
export function Tabs(props: TabsProps) {
  const classes = useStyles();
  const { tabs, clickedOn } = props;

  return (

    <Grid direction="row">
      {tabs.map((tab, idx) => (
        <Button
          className={idx === clickedOn ? classes.clickedButton : classes.otherButton}
          onClick={tab.onClick}
        >
          {tab.label}
        </Button>
      ))}
    </Grid>

  );
}
