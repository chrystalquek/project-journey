import {
  makeStyles, Grid, Table,
  TableBody, TableCell, TableContainer, TableHead,
  TableRow,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import React, { FC, useEffect } from 'react';
import { VolunteerData } from 'types/volunteer';
import { StoreState, useAppDispatch, useAppSelector } from '@redux/store';
import Head from 'next/head';
import { getCommitmentApplications, updateCommitmentApplication } from '@redux/actions/commitmentApplication';
import { getPendingVolunteers } from '@redux/actions/volunteer';
import { CommitmentApplicationData, CommitmentApplicationStatus } from '@type/commitmentApplication';
import { ActionableDialog } from '@components/common/ActionableDialog';
import { checkLoggedIn } from '@utils/helpers/auth';
import PendingRequestsTabs from '@components/common/PendingRequestsTabs';

const useStyles = makeStyles((theme) => ({
  shapeCircle: {
    backgroundColor: theme.palette.primary.main,
    height: 30,
    borderRadius: '5em',
    fontSize: 'small',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const PendingRequests: FC<{}> = ({ }) => {
  checkLoggedIn()
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPendingVolunteers());
    dispatch(getCommitmentApplications({ status: CommitmentApplicationStatus.Pending }));
  }, []);

  const volunteers = useAppSelector((state) => state.pendingVolunteer);
  const commitmentApplications = useAppSelector((state) => state.commitmentApplication);

  const upcomingVolunteersIds = volunteers.pendingVolunteers.ids;
  const upcomingCommitmentApplicationsIds = commitmentApplications.pendingCommitmentApplications.ids;

  const upcomingVolunteers = upcomingVolunteersIds.map((id) => volunteers.data[id]);
  const upcomingCommitmentApplications = upcomingCommitmentApplicationsIds.map((id) => commitmentApplications.data[id]);

  const [openApprove, setOpenApprove] = React.useState(false);

  const [openReject, setOpenReject] = React.useState(false);

  const onApproveReject = (commitmentApplication: CommitmentApplicationData) => {
    dispatch(updateCommitmentApplication(commitmentApplication));
    setOpenApprove(false);
    setOpenReject(false);
  };

  const getApproveRejectButtons = (volunteer: VolunteerData) => {
    const commitmentApplication = upcomingCommitmentApplications.find((commitmentApplications) => commitmentApplications.volunteerId == volunteer._id);
    const approveCommitmentApplication = { ...commitmentApplication, status: CommitmentApplicationStatus.Accepted };
    const rejectCommitmentApplication = { ...commitmentApplication, status: CommitmentApplicationStatus.Rejected };
    return (
      <Grid direction="row">
        <ActionableDialog open={openApprove} setOpen={() => setOpenApprove(!openApprove)} content={`Are you sure you want to approve ${volunteer.name} as a volunteer?`} buttonTitle="Approve" buttonOnClick={() => onApproveReject(approveCommitmentApplication)} openCloseButtonTitle="Approve" />
        <ActionableDialog open={openReject} setOpen={() => setOpenReject(!openReject)} content={`Are you sure you want to reject ${volunteer.name} as a volunteer?`} buttonTitle="Reject" buttonOnClick={() => onApproveReject(rejectCommitmentApplication)} openCloseButtonStyle="" openCloseButtonTitle={<CancelIcon color="error" fontSize="large" />} />
      </Grid>
    );
  };

  return (
    <>
      <Head>
        <title>Volunteer Pending Requests</title>
      </Head>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <PendingRequestsTabs clickedOn={0} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Date of Registration</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {upcomingVolunteers.map((volunteer) => (
                  <TableRow key={volunteer._id}>
                    <TableCell><b>{volunteer.name}</b></TableCell>
                    <TableCell>{new Date(volunteer.createdAt).toLocaleDateString()}</TableCell>
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
