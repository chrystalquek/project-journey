import React, { FC, useState, useCallback, useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAppDispatch, useAppSelector } from "@redux/store";
import Dialog from "@components/common/feedback/Dialog";
import DialogContent from "@components/common/feedback/DialogContent";
import DialogTitle from "@components/common/feedback/DialogTitle";
import CommittedConversionForm from "@components/form/CommittedConversionForm";
import {
  createCommitmentApplication,
  listCommitmentApplications,
} from "@redux/actions/commitmentApplication";
import { CreateCommitmentApplicationRequest } from "@api/request";
import { CommitmentApplicationStatus } from "@type/commitmentApplication";
import _ from "lodash";
import { assert } from "@utils/helpers/typescript";
import { useSnackbar } from "notistack";
import { selectCommitmentApplicationsByIds } from "@redux/reducers/commitmentApplication";

const useStyles = makeStyles((theme) => ({
  centralize: {
    textAlign: "center",
    justifyContent: "center",
    padding: "30px",
  },
  header: {
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
    cursor: "pointer",
  },
}));

const BecomeCommitedDialog: FC = () => {
  const user = useAppSelector((state) => state.session.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(listCommitmentApplications({ volunteerId: user._id }));
    }
  }, [dispatch, user]);

  const commitmentApplications = useAppSelector((state) =>
    selectCommitmentApplicationsByIds(
      state,
      state.commitmentApplication.listCommitmentApplicationIds
    )
  );

  const commitmentApplicationFetchStatus = useAppSelector(
    (state) => state.commitmentApplication.status
  );

  // Get the latest application.
  const latestCommitmentApplication = _.head(
    _.orderBy(commitmentApplications, (ca) => ca.createdAt, "desc")
  );

  // Check if there is pending application
  const isApplicationPending =
    latestCommitmentApplication?.status === CommitmentApplicationStatus.Pending;
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (formValues: Record<string, any>) => {
    assert(user, "User must be present before submitting.");
    formValues.volunteerId = user._id;
    // Drop the acknowledgement attributes before sending api call\
    const request = { ...formValues };
    request.volunteerId = user._id;
    delete request.isAwareOfGroupInvite;
    delete request.isAwareOfCommitmentExpectation;
    delete request.isAwareOfConfidentiality;
    delete request.isAwareOfBackgroundCheck;

    dispatch(
      createCommitmentApplication(request as CreateCommitmentApplicationRequest)
    );

    if (commitmentApplicationFetchStatus === "rejected") {
      enqueueSnackbar("Conversion application creation failed.", {
        variant: "error",
      });
    } else if (commitmentApplicationFetchStatus === "fulfilled") {
      enqueueSnackbar("Successfully Created Conversion application!", {
        variant: "error",
      });
    }
    handleClose();
  };

  return (
    <div>
      {/* Link to open the dialog */}
      <Typography className={classes.header}>
        {isApplicationPending ? (
          <Typography variant="body2"> Your application is pending </Typography>
        ) : (
          <Button color="secondary" onClick={handleClickOpen}>
            <u>Become a committed volunteer</u>
          </Button>
        )}
      </Typography>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle disableTypography>
          <Typography variant="h2" align="center">
            Conversion of Volunteer Status
          </Typography>
          <Typography variant="h3" align="center">
            Ad-hoc to Committed Volunteer
          </Typography>
        </DialogTitle>
        <DialogContent>
          <CommittedConversionForm handleSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BecomeCommitedDialog;
