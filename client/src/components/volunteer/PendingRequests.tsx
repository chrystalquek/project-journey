import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import React, { FC, useEffect } from "react";
import { VolunteerData } from "@type/volunteer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import {
  getPendingVolunteers,
  getPendingCommitmentApplications,
  updateCommitmentApplication,
} from "@redux/actions/volunteer/pendingRequests";
import {
  CommitmentApplicationData,
  CommitmentApplicationStatus,
} from "@type/commitmentApplication";
import { ActionableDialog } from "@components/common/ActionableDialog";
import { checkLoggedIn } from "@utils/helpers/auth";
import PendingRequestsTabs from "@components/common/PendingRequestsTabs";
import Header from "@components/common/Header";
import ErrorPage from "@components/common/ErrorPage";
import LoadingIndicator from "@components/common/LoadingIndicator";

const PendingRequests: FC<{}> = () => {
  checkLoggedIn();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPendingVolunteers());
    dispatch(getPendingCommitmentApplications());
  }, []);

  const { pendingVolunteers, pendingCommitmentApplications, isLoading, error } =
    useAppSelector((state) => state.volunteer.pendingRequests);

  const [openApprove, setOpenApprove] = React.useState(false);
  const [openReject, setOpenReject] = React.useState(false);

  const onApproveReject = (
    commitmentApplication: CommitmentApplicationData
  ) => {
    dispatch(
      updateCommitmentApplication({
        _id: commitmentApplication._id,
        data: commitmentApplication,
      })
    );
    setOpenApprove(false);
    setOpenReject(false);
  };

  const getApproveRejectButtons = (volunteer: VolunteerData) => {
    const commitmentApplication = pendingCommitmentApplications.find(
      (commApp) => commApp.volunteerId === volunteer._id
    );
    const approveCommitmentApplication = {
      ...commitmentApplication,
      status: CommitmentApplicationStatus.Accepted,
    };
    const rejectCommitmentApplication = {
      ...commitmentApplication,
      status: CommitmentApplicationStatus.Rejected,
    };
    return (
      <Grid direction="row">
        <ActionableDialog
          open={openApprove}
          setOpen={() => setOpenApprove(!openApprove)}
          content={`Are you sure you want to approve ${volunteer.name} as a volunteer?`}
          buttonTitle="Approve"
          buttonOnClick={() => onApproveReject(approveCommitmentApplication)}
          openCloseButtonTitle="Approve"
        />
        <ActionableDialog
          open={openReject}
          setOpen={() => setOpenReject(!openReject)}
          content={`Are you sure you want to reject ${volunteer.name} as a volunteer?`}
          buttonTitle="Reject"
          buttonOnClick={() => onApproveReject(rejectCommitmentApplication)}
          openCloseButtonStyle=""
          openCloseButtonTitle={<CancelIcon color="error" fontSize="large" />}
        />
      </Grid>
    );
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <>
      <Header title="Pending Requests" />
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <PendingRequestsTabs clickedOn={0} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Date of Registration</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingVolunteers.map((volunteer) => (
                  <TableRow key={volunteer._id}>
                    <TableCell>
                      <b>{volunteer.name}</b>
                    </TableCell>
                    <TableCell>
                      {new Date(volunteer.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{volunteer.volunteerType}</TableCell>
                    <TableCell>{getApproveRejectButtons(volunteer)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default PendingRequests;
