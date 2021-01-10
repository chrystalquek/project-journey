import React, { FC, useState, useCallback } from 'react';
import {
  Button, TextField, Dialog, DialogActions, DialogContent,
  DialogTitle, Link, Typography, Checkbox, useMediaQuery,
  FormControlLabel, Grid,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { createCommitmentApplication } from '@redux/actions/commitmentApplication';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@redux/store';

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
    cursor: 'pointer'
  },
}));

const BecomeCommited: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: StoreState) => state.user)

  const [open, setOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const CheckboxLabel = (
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

  const TermsAndAgreement = (
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

  const handleSubmit = useCallback(() => {
    setOpen(false)
    setChecked(false)
    dispatch(createCommitmentApplication({ volunteerId: user.user._id }))
  }, [open, checked])

  return (
    <div>
      {/* Link to open the dialog */}
      <Typography className={classes.header}>
        <Link color="secondary" onClick={handleClickOpen}>
          <u>Become a committed volunteer</u>
        </Link>
      </Typography>

      {/* Dialog */}
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

            {/* Form fields */}
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

            {/* Agreement checkbox */}
            <Grid item>
              <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleCheck} />}
                label={CheckboxLabel}
              />
            </Grid>
            <Grid item>
              {TermsAndAgreement}
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
};

export default BecomeCommited;
