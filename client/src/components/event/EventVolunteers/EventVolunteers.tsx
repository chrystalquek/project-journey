import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { SignUpData } from "@type/signUp";
import { Tabs } from "@components/common/Tabs";
import Header from "@components/common/Header";
import {
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Table from "@components/common/data-display/Table";
import { useEventVolunteers } from "./useEventVolunteers";
import { MoreButton } from "./buttons/MoreButton";
import { EditVolunteerRoleButton } from "./buttons/EditRoleButton";

export const rowsPerPage = 10;

const EventVolunteers = ({ eid }) => {
  const {
    // Event.
    event,
    // Volunteers.
    volunteerData,
    // Sign ups.
    approvedSignUps,
    nonApprovedSignUps,
    filteredApprovedSignUps,
    filteredNonApprovedSignUps,
    // Roles.
    roleVacancies,
    // Tabs.
    isApprovedTab,
    setIsApprovedTab,
    // Sort.
    selectedSort,
    setSelectedSort,
    // Search.
    searchString,
    setSearchString,
  } = useEventVolunteers(eid);

  const resetSortAndSearchSettings = () => {
    setSelectedSort("name");
    setSearchString("");
  };

  const tabs = [
    {
      key: "volunteers",
      label: `Volunteers (${approvedSignUps.length})`,
      onClick: () => {
        setIsApprovedTab(true);
        resetSortAndSearchSettings();
      },
    },
    {
      key: "pending-volunteers",
      label: `Pending (${nonApprovedSignUps.length})`,
      onClick: () => {
        setIsApprovedTab(false);
        resetSortAndSearchSettings();
      },
    },
  ];

  const columns: GridColDef[] = volunteerData && [
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      flex: 0.35,
      valueGetter: (params: GridValueGetterParams) => {
        const { userId } = params.row;
        const volunteer = volunteerData[userId];
        return volunteer?.name;
      },
    },
    {
      field: "Contact Number",
      headerName: "Contact Number",
      sortable: false,
      flex: 0.25,
      valueGetter: (params: GridValueGetterParams) => {
        const { userId } = params.row;
        const volunteer = volunteerData[userId];
        return volunteer?.mobileNumber;
      },
    },
  ];

  if (isApprovedTab) {
    columns.push({
      field: "role",
      headerName: "Role",
      sortable: isApprovedTab,
      flex: 0.3,
      renderCell: (params: GridCellParams) => params.row.acceptedRole,
    });
    columns.push({
      field: "",
      headerName: "",
      sortable: false,
      flex: 0.1,
      align: "right",
      renderCell: (params: GridCellParams) => {
        const { userId } = params.row;
        const volunteer = volunteerData[userId];
        const signUp = params.row as SignUpData;
        return (
          <MoreButton
            signUp={signUp}
            volunteerName={volunteer?.name}
            roleVacancies={roleVacancies}
          />
        );
      },
    });
  } else {
    columns.push({
      field: "",
      headerName: "",
      sortable: false,
      flex: 0.3,
      renderCell: (params: GridCellParams) => {
        const { userId } = params.row;
        const signUp = params.row as SignUpData;
        const volunteer = volunteerData[userId];
        return (
          <EditVolunteerRoleButton
            signUp={signUp}
            volunteerName={volunteer?.name}
            roleVacancies={roleVacancies}
          />
        );
      },
    });
  }

  return (
    <>
      <Header title="Event Volunteers" />
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} md={8}>
          <Typography variant="h1">{event?.name}</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Tabs tabs={tabs} clickedOn={isApprovedTab ? 0 : 1} />
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={8}
          alignItems="center"
          justify="center"
          spacing={2}
        >
          <Table
            columns={columns}
            rows={
              isApprovedTab
                ? filteredApprovedSignUps
                : filteredNonApprovedSignUps
            }
            searchText={searchString}
            onSearch={setSearchString}
            selectedSort={selectedSort}
            onSort={setSelectedSort}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EventVolunteers;
