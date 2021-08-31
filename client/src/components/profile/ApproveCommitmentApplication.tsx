import React, { FC, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { ActionableDialog } from "@components/common/ActionableDialog";
import { useAppDispatch, useAppSelector } from "@redux/store";
import {
  CommitmentApplicationData,
  CommitmentApplicationStatus,
} from "@type/commitmentApplication";
import { updateCommitmentApplication } from "@redux/actions/commitmentApplication";

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
}));

type ApproveCommitmentApplicationProps = {
  commitmentApplication: CommitmentApplicationData;
};

const ApproveCommitmentApplication: FC<ApproveCommitmentApplicationProps> = (
  props: ApproveCommitmentApplicationProps
) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const profilePageData = useAppSelector((state) => state.profilePage.data);
  const { commitmentApplication } = props;

  const DialogContent = profilePageData?.name
    ? `Are you sure you want to approve ${profilePageData.name}?`
    : "";

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
    );
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
