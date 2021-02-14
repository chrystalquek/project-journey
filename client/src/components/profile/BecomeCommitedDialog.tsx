import React, { FC, useState, useCallback } from 'react';
import {
  Button, TextField, Dialog, DialogActions, DialogContent,
  DialogTitle, Link, Typography, Checkbox, useMediaQuery,
  FormControlLabel, Grid,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { StoreState } from '@redux/store';
import CommittedConversionForm from '@components/form/CommittedConversionForm';

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
    cursor: 'pointer',
  },
}));

const BecomeCommited: FC = () => {
  const user = useSelector((state: StoreState) => state.user);
  // TODO: a better implementation to check pending application
  // this is just a quick fix, it's by no mean a correct flag
  const isPending : boolean = user.user.commitmentApplicationIds.length > 0;

  const [open, setOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setChecked(false);
  }, [open, checked]);

  return (
    <div>
      {/* Link to open the dialog */}
      <Typography className={classes.header}>
        {
          isPending
            ? (<Typography variant="body2"> Your application is pending </Typography>)
            : (
              <Link color="secondary" onClick={handleClickOpen}>
                <u>Become a committed volunteer</u>
              </Link>
            )
        }
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
          <CommittedConversionForm/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BecomeCommited;
