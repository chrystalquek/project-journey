import Table from "@components/common/data-display/Table";
import ErrorPage from "@components/common/ErrorPage";
import Header from "@components/common/Header";
import LoadingIndicator from "@components/common/LoadingIndicator";
import PendingRequestsTabs from "@components/common/PendingRequestsTabs";
import { ERROR_MESSAGE } from "@constants/messages";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import {
  GridCellParams,
  GridColDef,
  GridRowParams,
  GridValueFormatterParams,
} from "@material-ui/data-grid";
import {
  getPendingSignUps,
  getUpcomingEvents,
} from "@redux/actions/events/pendingRequests";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { EventData } from "@type/event";
import { SignUpData, SignUpStatus } from "@type/signUp";
import { useIsMobile } from "@utils/helpers/layout";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import EventBreadCrumbs from "./EventBreadCrumbs";

const useStyles = makeStyles((theme) => ({
  shapeCircle: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
    borderRadius: "50%",
    textAlign: "center",
    fontSize: "large",
    color: theme.palette.common.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  eventName: {
    cursor: "pointer",
  },
}));

const PendingRequests: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(getUpcomingEvents());
    dispatch(getPendingSignUps());
  }, [dispatch]);

  const { pendingSignUps, upcomingEvents, isLoading, error } = useAppSelector(
    (state) => state.event.pendingRequests
  );

  const pendingRequestsForEventCount = (event: EventData) => {
    let result = 0;
    pendingSignUps.forEach((signUp: SignUpData) => {
      if (
        signUp.eventId === event._id &&
        signUp.status === SignUpStatus.PENDING
      )
        result += 1;
    });
    return result;
  };

  const upcomingEventsWithPendingSignUps = upcomingEvents.filter(
    (event) => pendingRequestsForEventCount(event) !== 0
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <ErrorPage message={error.message ?? ERROR_MESSAGE} />;
  }

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Event Name",
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <Typography
          style={{ fontWeight: "bold" }}
          onClick={() => router.push(`/event/${params.id}`)}
          className={classes.eventName}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "startDate",
      headerName: "Date of Event",
      sortable: false,
      valueFormatter: (params: GridValueFormatterParams) =>
        new Date(params.value as string).toLocaleDateString(),
    },
    {
      field: "",
      headerName: "",
      sortable: false,
      align: "right",
      renderCell: (params: GridCellParams) => (
        <div className={classes.shapeCircle}>
          {pendingRequestsForEventCount(params.row as EventData)}
        </div>
      ),
    },
  ];

  return (
    <>
      <Header title="Pending Requests - Events" />
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          {!isMobile && <EventBreadCrumbs name="Pending Events" />}
          <PendingRequestsTabs clickedOn={1} />
          <Table
            columns={columns}
            rows={upcomingEventsWithPendingSignUps}
            onRowClick={(param: GridRowParams) =>
              router.push(`/event/${param.id}/volunteers`)
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PendingRequests;
