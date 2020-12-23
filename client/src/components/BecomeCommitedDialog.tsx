import React, { useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  centralize: {
    textAlign: 'center',
    justifyContent: 'center',
    padding: '30px',
  },
  header: {
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));

export default function BecomeCommited() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const checkboxLabel = () => (
    <Typography>
      I understand to regularly participate in BIAB events in the
      <Link color="secondary">
        {' '}
        <strong>next 3 months</strong>
        {' '}
      </Link>
      in becoming a committed volunteer, upon approval from the admin.
    </Typography>
  );

  const termsAndAgreement = () => (
    <Typography>
      By confirming, my application, I agree to the
      <Link color="secondary">
        {' '}
        <strong><u>Privacy</u></strong>
        {' '}
      </Link>
      {' '}
      and
      <Link color="secondary">
        {' '}
        <strong><u>Terms of Service</u></strong>
        {' '}
      </Link>
      of Blessings in a Bag.
    </Typography>
  );

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setChecked(false);
  }, [open, checked]);

  const handleCheck = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  return (
    <div>
      <Typography className={classes.header}>
        <Link color="secondary" onClick={handleClickOpen}>
          <u>Become a committed volunteer</u>
        </Link>
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={isMobile}
      >
        <DialogTitle className={classes.centralize}>
          <Typography variant="h2">
            Conversion of Volunteer Status
          </Typography>
          <Typography variant="h3">
            Ad-hoc to Committed Volunteer
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                variant="outlined"
                autoFocus
                margin="dense"
                id="name"
                label="Occupation"
                type="email"
                fullWidth
                color="secondary"
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                margin="dense"
                id="name"
                label="Open ended question"
                type="email"
                fullWidth
                color="secondary"
                multiline
                rows={5}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                margin="dense"
                id="name"
                label="Open ended question"
                type="email"
                fullWidth
                color="secondary"
                multiline
                rows={5}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleCheck} />}
                label={checkboxLabel()}
              />
            </Grid>
            <Grid item>
              {termsAndAgreement()}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={classes.centralize}>
          <Button
            variant="contained"
            onClick={handleClose}
            color="primary"
            disabled={!checked}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
