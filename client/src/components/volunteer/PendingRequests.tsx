import { capitalize, Grid } from "@material-ui/core";
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
import { useAuthenticatedRoute } from "@utils/helpers/auth";
import PendingRequestsTabs from "@components/common/PendingRequestsTabs";
import Header from "@components/common/Header";
import ErrorPage from "@components/common/ErrorPage";
import LoadingIndicator from "@components/common/LoadingIndicator";
import {
  GridCellParams,
  GridValueFormatterParams,
} from "@material-ui/data-grid";
import Table from "@components/common/data-display/Table";

const PendingRequests: FC<{}> = () => {
  useAuthenticatedRoute();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPendingVolunteers());
    dispatch(getPendingCommitmentApplications());
  }, [dispatch]);

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
      <Grid container>
        <Grid item>
          <ActionableDialog
            open={openApprove}
            setOpen={() => setOpenApprove(!openApprove)}
            content={`Are you sure you want to approve ${volunteer.name} as a volunteer?`}
            buttonTitle="Approve"
            buttonOnClick={() => onApproveReject(approveCommitmentApplication)}
            openCloseButtonTitle="Approve"
          />
        </Grid>
        <Grid item>
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
      </Grid>
    );
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <ErrorPage message={error.message} />;
  }

  const columns = [
    {
      field: "name",
      headerName: "Name",
      sortable: false,
      width: 300,
    },
    {
      field: "createdAt",
      headerName: "Date of Registration",
      width: 200,
      valueFormatter: (params: GridValueFormatterParams) =>
        new Date(params.value as string).toLocaleDateString(),
    },
    {
      field: "volunteerType",
      headerName: "Volunteer Type",
      sortable: false,
      width: 150,
      valueFormatter: (params: GridValueFormatterParams) =>
        capitalize(params.value as string),
    },
    {
      field: "",
      headerName: "",
      sortable: false,
      width: 300,
      renderCell: (params: GridCellParams) =>
        getApproveRejectButtons(params.row as VolunteerData),
    },
  ];

  return (
    <>
      <Header title="Pending Requests" />
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} md={9}>
          <PendingRequestsTabs clickedOn={0} />
          <Table rows={pendingVolunteers} columns={columns} />
        </Grid>
      </Grid>
    </>
  );
};

export default PendingRequests;
