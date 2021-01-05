import { makeStyles, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import React, { FC, useEffect } from 'react';
import { VolunteerData } from 'types/volunteer';
import { StoreState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '@components/common/NavBar';
import { Footer } from 'antd/lib/layout/layout';
import Head from 'next/head';
import { getCommitmentApplications, updateCommitmentApplication } from '@redux/actions/commitmentApplication';
import { getPendingVolunteers } from '@redux/actions/volunteer';
import { CommitmentApplicationData, CommitmentApplicationStatus } from '@type/commitmentApplication';
import { ActionableDialog } from '@components/common/ActionableDialog';

const useStyles = makeStyles((theme) => ({
    shapeCircle: {
        backgroundColor: theme.palette.primary.main,
        height: 30,
        borderRadius: '5em',
        fontSize: 'small',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));


const PendingRequests: FC<{}> = ({ }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const user = useSelector((state: StoreState) => state.user);

    useEffect(() => {
        dispatch(getPendingVolunteers());
        dispatch(getCommitmentApplications({ status: "pending" }))
    }, []);

    const volunteers = useSelector((state: StoreState) => state.volunteer)
    const commitmentApplications = useSelector((state: StoreState) => state.commitmentApplication)

    const upcomingVolunteersIds = volunteers.pendingVolunteers.ids
    const upcomingCommitmentApplicationsIds = commitmentApplications.pendingCommitmentApplications.ids;

    const upcomingVolunteers = upcomingVolunteersIds.map(id => volunteers.data[id])
    const upcomingCommitmentApplications = upcomingCommitmentApplicationsIds.map(id => commitmentApplications.data[id])

    const [openApprove, setOpenApprove] = React.useState(false);

    const [openReject, setOpenReject] = React.useState(false);

    const onApproveReject = (commitmentApplication: CommitmentApplicationData) => {
        dispatch(updateCommitmentApplication(commitmentApplication))
        setOpenApprove(false)
    }

    const getApproveRejectButtons = (volunteer: VolunteerData) => {
        const commitmentApplication = upcomingCommitmentApplications.find(commitmentApplications => commitmentApplications.volunteerId == volunteer._id)
        const approveCommitmentApplication = { ...commitmentApplication, status: CommitmentApplicationStatus.Accepted }
        const approveButton = <Button className={classes.shapeCircle} onClick={() => setOpenApprove(true)}>  APPROVE  </Button>
        const rejectCommitmentApplication = { ...commitmentApplication, status: CommitmentApplicationStatus.Rejected }
        const rejectButton = <Button onClick={() => setOpenReject(true)}><CancelIcon color='error' fontSize='large' /></Button>
        return <Grid direction="row">
            {approveButton} <ActionableDialog open={openApprove} onClose={() => setOpenApprove(false)} content={`Are you sure you want to approve ${volunteer.name} as a volunteer?`} buttonTitle="Approve" buttonOnClick={() => onApproveReject(approveCommitmentApplication)} />
            {rejectButton} <ActionableDialog open={openReject} onClose={() => setOpenReject(false)} content={`Are you sure you want to reject ${volunteer.name} as a volunteer?`} buttonTitle="Reject" buttonOnClick={() => onApproveReject(approveCommitmentApplication)} />
        </Grid>
    }

    return (
        <>
            <Head>
                <title>Volunteer Pending Requests</title>
            </Head>
            <NavBar userData={user.user} />
            <Grid container alignItems="center" justify="center">
                <Grid item xs={8}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Name</b></TableCell>
                                    <TableCell><b>Date of Registration</b></TableCell>
                                    <TableCell><b>Status</b></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {upcomingVolunteers.map((volunteer) => (
                                    <TableRow key={volunteer._id}>
                                        <TableCell><b>{volunteer.name}</b></TableCell>
                                        <TableCell>{volunteer.createdAt.toLocaleDateString()}</TableCell>
                                        <TableCell>{volunteer.volunteerType}</TableCell>
                                        <TableCell>{getApproveRejectButtons(volunteer)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Footer />

        </>);
}

export default PendingRequests;
