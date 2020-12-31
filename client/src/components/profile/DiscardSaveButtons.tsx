import React, { FC } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  save: {
    color: '#FFFFFF',
  },
  discard: {
    color: theme.palette.secondary.main,
  },
}));

type props = {
  show: boolean,
  onSave(): void,
  onDiscard(): void
}

const DiscardSaveButtons: FC<props> = ({ show, onSave, onDiscard }) => {
  const classes = useStyles();

  return show && (
  <Grid item container spacing={2}>

    {/* SAVE button */}
    <Grid item>
      <Button
        variant="contained"
        color="secondary"
        onClick={onSave}
        size="small"
        disableElevation
      >
        <Typography variant="body2" className={classes.save}>
          Save
        </Typography>
      </Button>
    </Grid>

    {/* DISCARD button */}
    <Grid item>
      <Button
        color="secondary"
        onClick={onDiscard}
        size="small"
        disableElevation
      >
        <Typography variant="body2" className={classes.discard}>
          Discard
        </Typography>
      </Button>
    </Grid>
  </Grid>
  );
};

export default DiscardSaveButtons;
