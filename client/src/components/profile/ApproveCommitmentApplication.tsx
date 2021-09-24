import { ActionableDialog } from "@components/common/ActionableDialog";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { updateCommitmentApplication } from "@redux/actions/commitmentApplication";
import { useAppDispatch } from "@redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  CommitmentApplicationData,
  CommitmentApplicationStatus,
} from "@type/commitmentApplication";
import { VolunteerData } from "@type/volunteer";
import { useSnackbar } from "notistack";
import React, { FC, useState } from "react";

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
}));

type Props = {
  commitmentApplication: CommitmentApplicationData;
  profilePageData: VolunteerData;
};

const ApproveCommitmentApplication: FC<Props> = ({
  commitmentApplication,
  profilePageData,
}: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const DialogContent = profilePageData?.name
    ? `Are you sure you want to approve ${profilePageData.name}?`
    : "";

  const { enqueueSnackbar } = useSnackbar();

  const handleApproveEvent = () => {
    // Change the status of the commitment Application
    const updatedCommitmentApplication = {
      ...commitmentApplication,
      status: CommitmentApplicationStatus.Accepted,
    };
    dispatch(
      updateCommitmentApplication({
        data: updatedCommitmentApplication,
        _id: commitmentApplication._id,
      })
    )
      .then(unwrapResult)
      .catch(() => {
        enqueueSnackbar("Conversion application approval failed.", {
          variant: "error",
        });
      });
  };

  return (
    <div className={classes.header}>
      <Typography variant="body2">
        {" "}
        Pending approval for conversion to committed volunteer{" "}
      </Typography>
      <ActionableDialog
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        content={DialogContent}
        buttonOnClick={handleApproveEvent}
        openCloseButtonTitle="Approve Conversion"
        recommendedAction="cancel"
      />
    </div>
  );
};

export default ApproveCommitmentApplication;
