import React, { FC, useState, useCallback } from 'react';
import {
  Dialog, DialogContent,
  DialogTitle, Link, Typography, useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { StoreState, useAppDispatch, useAppSelector } from '@redux/store';
import CommittedConversionForm from '@components/form/CommittedConversionForm';
import { createCommitmentApplication } from '@redux/actions/commitmentApplication';
import { CreateCommitmentApplicationRequest } from 'api/request';
import { CommitmentApplicationStatus } from '@type/commitmentApplication';

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
  dialogContent: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    msOverflowStyle: '-ms-autohiding-scrollbar',
    height: '100%'
  }
}));

const BecomeCommited: FC = () => {
  const user = useAppSelector((state) => state.user);
  const userData = user.user
  const dispatch = useAppDispatch();

  const length = userData?.commitmentApplicationIds?.length
  const commitmentApplication: any = length
    ? userData.commitmentApplicationIds[length - 1]
    : null
  // Check if there is pending application
  const isPending: boolean = commitmentApplication?.status == CommitmentApplicationStatus.Pending
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  const handleSubmit = async (formValues: Record<string, any>) => {
    formValues.volunteerId = user.user._id
    // Drop the acknowledgement attributes before sending api call\
    const request = { ...formValues }
    request.volunteerId = user.user._id;
    delete request.isAwareOfGroupInvite;
    delete request.isAwareOfCommitmentExpectation;
    delete request.isAwareOfConfidentiality;
    delete request.isAwareOfBackgroundCheck;

    await dispatch(createCommitmentApplication(request as CreateCommitmentApplicationRequest));
    handleClose();
  }

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
        <DialogContent className={classes.dialogContent}>
          <CommittedConversionForm handleSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BecomeCommited;
