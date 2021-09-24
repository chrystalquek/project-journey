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
  getPendingCommitmentApplications,
  getPendingVolunteers,
  updateCommitmentApplication,
} from "@redux/actions/volunteer/pendingRequests";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
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

  useEffect(() => {
    dispatch(getPendingVolunteers());
    dispatch(getPendingCommitmentApplications());
  }, [dispatch]);

  const { pendingVolunteers, pendingCommitmentApplications, isLoading } =
    useAppSelector((state) => state.volunteer.pendingRequests);

  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

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
    )
      .then(unwrapResult)
      .catch(() => {
        enqueueSnackbar(
          `Conversion application ${
            status === CommitmentApplicationStatus.Accepted
              ? "approval"
              : "rejection"
          } failed.`,
          {
            variant: "error",
          }
        );
      });
    setOpenApprove(false);
    setOpenReject(false);
  };

  const getApproveRejectButtons = (volunteer: VolunteerData) => {
    const commitmentApplication = pendingCommitmentApplications.find(
      (commApp) => commApp.volunteerId === volunteer._id
    );
    if (!commitmentApplication) {
      return <></>;
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
