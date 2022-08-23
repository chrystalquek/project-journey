import { ActionableDialog } from "@components/common/ActionableDialog";
import Table from "@components/common/data-display/Table";
import Header from "@components/common/Header";
import LoadingIndicator from "@components/common/LoadingIndicator";
import PendingRequestsTabs from "@components/common/PendingRequestsTabs";
import VolunteerBreadCrumbs from "@components/volunteer/VolunteerBreadCrumbs";
import { capitalize, Grid } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";
import {
  listCommitmentApplications,
  updateCommitmentApplication,
} from "@redux/actions/commitmentApplication";
import { getPendingVolunteers } from "@redux/actions/volunteer";
import { selectCommitmentApplicationsByIds } from "@redux/reducers/commitmentApplication";
import { selectVolunteersByIds } from "@redux/reducers/volunteer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import {
  CommitmentApplicationData,
  CommitmentApplicationStatus,
} from "@type/commitmentApplication";
import { VolunteerData } from "@type/volunteer";
import { useIsMobile } from "@utils/helpers/layout";
import { useSnackbar } from "notistack";
import React, { FC, useEffect, useState } from "react";

const PendingRequests: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getPendingVolunteers());
    dispatch(
      listCommitmentApplications({
        status: CommitmentApplicationStatus.Pending,
      })
    );
  }, [dispatch]);

  const pendingCommitmentApplications = useAppSelector((state) =>
    selectCommitmentApplicationsByIds(
      state,
      state.commitmentApplication.listCommitmentApplicationIds
    )
  );

  const pendingVolunteers = useAppSelector((state) =>
    selectVolunteersByIds(state, state.volunteer.pendingVolunteerIds)
  );

  const isLoading = useAppSelector(
    (state) =>
      state.volunteer.status === "pending" ||
      state.commitmentApplication.status === "pending"
  );

  const commitmentApplicationFetchStatus = useAppSelector(
    (state) => state.commitmentApplication.status
  );

  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);

  const onApproveReject = (
    commitmentApplication: CommitmentApplicationData,
    status: CommitmentApplicationStatus
  ) => {
    const updatedCommitmentApplication = {
      ...commitmentApplication,
      status,
    };
    dispatch(
      updateCommitmentApplication({
        _id: commitmentApplication._id,
        data: updatedCommitmentApplication,
      })
    );
    if (commitmentApplicationFetchStatus === "rejected") {
      enqueueSnackbar(
        `Conversion application ${
          status === CommitmentApplicationStatus.Accepted
            ? "Approval"
            : "Rejection"
        } failed.`,
        {
          variant: "error",
        }
      );
    } else if (commitmentApplicationFetchStatus === "fulfilled") {
      enqueueSnackbar(
        `Successfully ${
          status === CommitmentApplicationStatus.Accepted
            ? "Approved"
            : "Rejected"
        } Conversion application!`,
        {
          variant: "success",
        }
      );
    }

    setOpenApprove(false);
    setOpenReject(false);
  };

  const getApproveRejectButtons = (volunteer: VolunteerData) => {
    const commitmentApplication = pendingCommitmentApplications.find(
      (commApp) => commApp.volunteerId === volunteer._id
    );
    if (!commitmentApplication) {
      return null;
    }

    return (
      <Grid container>
        <Grid item>
          <ActionableDialog
            open={openApprove}
            setOpen={() => setOpenApprove(!openApprove)}
            content={`Are you sure you want to approve ${volunteer.name} as a volunteer?`}
            buttonOnClick={() =>
              onApproveReject(
                commitmentApplication,
                CommitmentApplicationStatus.Accepted
              )
            }
            openCloseButtonTitle="Approve"
          />
        </Grid>
        <Grid item>
          <ActionableDialog
            open={openReject}
            setOpen={() => setOpenReject(!openReject)}
            content={`Are you sure you want to reject ${volunteer.name} as a volunteer?`}
            buttonOnClick={() =>
              onApproveReject(
                commitmentApplication,
                CommitmentApplicationStatus.Rejected
              )
            }
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
