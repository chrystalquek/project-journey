import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  save: {
    color: '#FFFFFF',
  },
  discard: {
    color: theme.palette.secondary.main,
  },
}));

export default function DiscardSaveButtons({ show, onSave, onDiscard }) {
  const classes = useStyles();

  return show
    ? (
      <Grid item container spacing={2}>
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
    )
    : null;
}
