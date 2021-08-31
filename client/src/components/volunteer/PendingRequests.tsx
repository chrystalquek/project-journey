import { ActionableDialog } from "@components/common/ActionableDialog";
import Table from "@components/common/data-display/Table";
import ErrorPage from "@components/common/ErrorPage";
import Header from "@components/common/Header";
import LoadingIndicator from "@components/common/LoadingIndicator";
import PendingRequestsTabs from "@components/common/PendingRequestsTabs";
import { ERROR_MESSAGE } from "@constants/messages";
import { capitalize, Grid } from "@material-ui/core";
import {
  GridCellParams,
  GridValueFormatterParams,
} from "@material-ui/data-grid";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  getPendingCommitmentApplications,
  getPendingVolunteers,
  updateCommitmentApplication,
} from "@redux/actions/volunteer/pendingRequests";
import { useAppDispatch, useAppSelector } from "@redux/store";
import {
  CommitmentApplicationData,
  CommitmentApplicationStatus,
} from "@type/commitmentApplication";
import { VolunteerData } from "@type/volunteer";
import { useIsMobile } from "@utils/helpers/layout";
import { FC, useEffect, useState } from "react";
import VolunteerBreadCrumbs from "./VolunteerBreadCrumbs";

const PendingRequests: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(getPendingVolunteers());
    dispatch(getPendingCommitmentApplications());
  }, [dispatch]);

  const { pendingVolunteers, pendingCommitmentApplications, isLoading, error } =
    useAppSelector((state) => state.volunteer.pendingRequests);

  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);

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
    const approveCommitmentApplication = commitmentApplication
      ? {
          ...commitmentApplication,
          status: CommitmentApplicationStatus.Accepted,
        }
      : null;
    const rejectCommitmentApplication = commitmentApplication
      ? {
          ...commitmentApplication,
          status: CommitmentApplicationStatus.Rejected,
        }
      : null;
    return (
      <Grid container>
        <Grid item>
          <ActionableDialog
            open={openApprove}
            setOpen={() => setOpenApprove(!openApprove)}
            content={`Are you sure you want to approve ${volunteer.name} as a volunteer?`}
            buttonOnClick={() => {
              if (approveCommitmentApplication) {
                onApproveReject(approveCommitmentApplication);
              }
            }}
            openCloseButtonTitle="Approve"
          />
        </Grid>
        <Grid item>
          <ActionableDialog
            open={openReject}
            setOpen={() => setOpenReject(!openReject)}
            content={`Are you sure you want to reject ${volunteer.name} as a volunteer?`}
            buttonOnClick={() => {
              if (rejectCommitmentApplication) {
                onApproveReject(rejectCommitmentApplication);
              }
            }}
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
    return <ErrorPage message={error.message ?? ERROR_MESSAGE} />;
  }

  const columns = [
    {
      field: "name",
      headerName: "Name",
      sortable: false,
      width: 200,
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
      width: 250,
      renderCell: (params: GridCellParams) =>
        getApproveRejectButtons(params.row as VolunteerData),
    },
  ];

  return (
    <>
      <Header title="Pending Requests - Volunteers" />
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          {!isMobile && <VolunteerBreadCrumbs name="Pending Volunteers" />}
          <PendingRequestsTabs clickedOn={0} />
          <Table rows={pendingVolunteers} columns={columns} />
        </Grid>
      </Grid>
    </>
  );
};

export default PendingRequests;
