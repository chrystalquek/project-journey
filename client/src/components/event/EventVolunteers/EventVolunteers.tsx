import {
  makeStyles,
  Grid,
  IconButton,
  Button,
  Popover,
  FormControl,
  Select,
  MenuItem,
  Badge,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { getVolunteersById } from "@redux/actions/volunteer";
import {
  getSignUpsUpcomingEvent,
  updateSignUpInstant,
} from "@redux/actions/signUp";
import { SignUpData, SignUpStatus } from "@type/signUp";
import { Tabs } from "@components/common/Tabs";
import { unwrapResult } from "@reduxjs/toolkit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { ActionableDialog } from "@components/common/ActionableDialog";
import CloseIcon from "@material-ui/icons/Close";
import { getEvent } from "@redux/actions/event";
import CheckIcon from "@material-ui/icons/Check";
import { UpdateSignUpRequest } from "@api/request";
import Header from "@components/common/Header";
import {
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
} from "@material-ui/data-grid";
import Table from "@components/common/data-display/Table";

export const rowsPerPage = 10;

const useStyles = makeStyles((theme) => ({
  popUpButton: {
    textTransform: "none",
    width: "100%",
    textAlign: "left",
  },
  // TODO abstract this to button
  redCloseButton: {
    width: "55px",
    height: "38px",
    backgroundColor: "#D32A20", // red
    "&:hover": {
      backgroundColor: "#eb3e34", // lighter red
    },
    borderRadius: "5em",
  },
  whiteCancelIcon: {
    color: theme.palette.common.white,
  },
  // TODO abstract this to button
  assignButton: {
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "#def024", // lighter green
    },
    borderRadius: "5em",
    color: theme.palette.common.white,
    width: "80%",
  },
  tickButton: {
    width: "55px",
    height: "38px",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "#def024", // lighter green
    },
    borderRadius: "5em",
  },
  selectRole: {
    minWidth: "100%",
    borderRadius: "10px",
    boxShadow: "0px 2px 4px 1px rgba(0, 0, 0, 0.25)",
  },
  badge: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
}));

const EventVolunteers = ({ eid }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const signUps = useAppSelector((state) => state.signUp);
  const event = useAppSelector((state) => state.event.event.form);
  const roles = event?.roles;

  const [allVolunteerIds, setAllVolunteerIds] = useState<string[]>([]);
  const [allVolunteerData, setAllVolunteerData] = useState({});
  const [approvedSignUps, setApprovedSignUps] = useState<SignUpData[]>([]);
  const [nonApprovedSignUps, setNonApprovedSignUps] = useState<SignUpData[]>(
    []
  );
  const [selectedRoles, setSelectedRoles] = useState({});
  const [roleVacancies, setRoleVacancies] = useState({});
  const [displayedApprovedSignUps, setDisplayedApprovedSignUps] = useState<
    SignUpData[]
  >([]);
  const [displayedNonApprovedSignUps, setDisplayedNonApprovedSignUps] =
    useState<SignUpData[]>([]);

  useEffect(() => {
    if (eid) {
      dispatch(getEvent(eid));
      dispatch(getSignUpsUpcomingEvent({ id: eid, idType: "eventId" }));
    }
  }, [dispatch, eid]);

  useEffect(() => {
    if (signUps && eid) {
      const signUpsData = signUps.data;
      const volunteerIds = Object.values(signUpsData)
        .filter((signUp) => signUp.eventId === eid)
        .map((signUp) => signUp.userId);

      setAllVolunteerIds(volunteerIds);
    }
  }, [eid, signUps]);

  const getVolunteerData = useCallback(async () => {
    const volunteerData = await dispatch(
      getVolunteersById({ ids: allVolunteerIds })
    )
      // @ts-ignore type exists
      .then(unwrapResult)
      .then((result) => result.data);
    return volunteerData;
  }, [allVolunteerIds, dispatch]);

  useEffect(() => {
    const updateVolunteerData = async () => {
      const volunteerDataMap = {};
      const volunteerData = await getVolunteerData();

      volunteerData.forEach((volunteer) => {
        volunteerDataMap[volunteer._id] = volunteer;
      });
      setAllVolunteerData(volunteerDataMap);
    };

    if (allVolunteerIds.length) updateVolunteerData();
  }, [allVolunteerIds, getVolunteerData]);

  const getVacanciesForAllRoles = useCallback(() => {
    const vacancies = {};
    roles?.forEach((role) => {
      const num = role.capacity - role.volunteers.length;
      vacancies[role.name] = num > 0 ? num : 0;
    });
    return vacancies;
  }, [roles]);
  useEffect(() => {
    setRoleVacancies(getVacanciesForAllRoles());
  }, [event, getVacanciesForAllRoles, roles]);

  useEffect(() => {
    const signUpData = signUps.data;
    const approved = [];
    const nonApproved = [];
    Object.values(signUpData)
      .filter((signUp) => signUp.eventId === eid)
      .forEach((signUp) => {
        if (signUp.status === SignUpStatus.ACCEPTED) {
          approved.push(signUp);
        } else {
          nonApproved.push(signUp);
        }
      });
    dispatch(getEvent(eid));

    setApprovedSignUps(approved);
    setDisplayedApprovedSignUps(approved);
    setNonApprovedSignUps(nonApproved);
    setDisplayedNonApprovedSignUps(nonApproved);
  }, [dispatch, eid, signUps]);

  /** Anchor for  more button's popover */
  const [anchorEl, setAnchorEl] = useState(null);

  /** Id of an opened more button popoover */
  const [openedPopoverId, setOpenedPopoverId] = useState(null);

  const handleClickMoreButton = (e, popoverId) => {
    setOpenedPopoverId(popoverId);
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMoreButton = () => {
    setOpenedPopoverId(null);
    setAnchorEl(null);
  };

  /** States for the choices of the popover buttons */
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [signUpIdOfRolesBeingEdited, setSignUpIdOfRolesBeingEdited] = useState(
    []
  );

  const onUpdateSignUp = (request: UpdateSignUpRequest) => {
    dispatch(updateSignUpInstant(request));
    setOpenRemoveDialog(false);
  };

  const handleSelectedRoleChange = (signUpId, e) => {
    setSelectedRoles({ ...selectedRoles, [signUpId]: e.target.value });
  };

  /** Get roles select menu */
  const getRoleSelectMenu = (signUp: SignUpData) => (
    <FormControl variant="outlined" className={classes.selectRole}>
      <Select
        defaultValue={
          signUp && signUp.status === SignUpStatus.ACCEPTED
            ? signUp.acceptedRole
            : "Role"
        }
        value={selectedRoles[signUp._id]}
        onChange={(e) => handleSelectedRoleChange(signUp._id, e)}
      >
        <MenuItem value="" disabled>
          Preferences
        </MenuItem>
        {signUp?.preferences.map((preference, index) => (
          <MenuItem
            value={preference}
            disabled={roleVacancies[preference] === 0}
          >
            <Grid container direction="row" justify="flex-end">
              <Grid item xs={11}>
                {`${index + 1}. ${preference}`}
              </Grid>
              <Grid item xs={1}>
                <Badge
                  badgeContent={roleVacancies[preference]}
                  classes={{ badge: classes.badge }}
                />
              </Grid>
            </Grid>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const onAssignRole = (signUp: SignUpData) => {
    const selectedRole = selectedRoles[signUp._id];

    dispatch(
      updateSignUpInstant({
        data: {
          ...signUp,
          status: SignUpStatus.ACCEPTED,
          acceptedRole: selectedRole,
        },
        id: signUp._id,
        idType: "signUpId",
      })
    );
  };

  const handleEditingButtonClick = (signUp: SignUpData) => {
    const signUpIdOfRolesBeingEditedCopy = [...signUpIdOfRolesBeingEdited];
    const idx = signUpIdOfRolesBeingEditedCopy.indexOf(signUp._id);
    if (idx > -1) signUpIdOfRolesBeingEditedCopy.splice(idx, 1);
    setSignUpIdOfRolesBeingEdited(signUpIdOfRolesBeingEditedCopy);
  };

  /** Get  buttons for the approved tab */
  const getApprovedTabButtons = (signUp: SignUpData, volunteerName: string) => {
    const getEditRoleButton = (signUpId) => {
      const updatedSignUpIdOfRolesBeingEdited = [
        ...signUpIdOfRolesBeingEdited,
        signUpId,
      ];
      return (
        <Button
          className={classes.popUpButton}
          onClick={() => {
            setSignUpIdOfRolesBeingEdited(updatedSignUpIdOfRolesBeingEdited);
            handleCloseMoreButton();
          }}
        >
          Edit Role
        </Button>
      );
    };

    const moreButton = (
      <div>
        <IconButton
          onClick={(e) => handleClickMoreButton(e, signUp._id)}
          ref={anchorEl}
        >
          <MoreVertIcon />
        </IconButton>
        <Popover
          id={signUp._id}
          open={openedPopoverId === signUp._id}
          anchorEl={anchorEl}
          onClose={handleCloseMoreButton}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
        >
          <Grid>
            <Grid item>
              <ActionableDialog
                open={openRemoveDialog}
                setOpen={() => setOpenRemoveDialog(!openRemoveDialog)}
                content={`Are you sure you want to remove ${volunteerName} as a volunteer?`}
                buttonTitle="Delete"
                buttonOnClick={() =>
                  onUpdateSignUp({
                    data: { ...signUp, status: SignUpStatus.PENDING },
                    id: signUp._id,
                    idType: "signUpId",
                  })
                }
                openCloseButtonStyle="popUpButton"
                openCloseButtonTitle="Remove Volunteer from Event"
                recommendedAction="cancel"
              />
            </Grid>
            <Grid item>{getEditRoleButton(signUp._id)}</Grid>
          </Grid>
        </Popover>
      </div>
    );

    const editingButtons = (
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item>
          <IconButton
            className={classes.tickButton}
            disabled={roleVacancies[selectedRoles[signUp._id]] === 0}
            onClick={() => onAssignRole(signUp)}
          >
            <CheckIcon className={classes.whiteCancelIcon} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            className={classes.redCloseButton}
            onClick={() => handleEditingButtonClick(signUp)}
          >
            <CloseIcon className={classes.whiteCancelIcon} />
          </IconButton>
        </Grid>
      </Grid>
    );

    return (
      <div>
        {signUpIdOfRolesBeingEdited.includes(signUp._id)
          ? editingButtons
          : moreButton}
      </div>
    );
  };

  /** Get buttons for the pending tab */
  const getPendingTabButtons = (signUp: SignUpData) => {
    const assignButton = (
      <Button
        className={classes.assignButton}
        onClick={() => onAssignRole(signUp)}
        disabled={!selectedRoles[signUp._id]}
      >
        Assign
      </Button>
    );

    const assignedButton = <Button disabled>Assigned</Button>;

    if (signUp.status === SignUpStatus.ACCEPTED) {
      return assignedButton;
    }

    return (
      <Grid container direction="row" alignItems="center">
        <Grid item xs={12}>
          {assignButton}
        </Grid>
      </Grid>
    );
  };

  const [isApprovedTab, setIsApprovedTab] = useState(true);

  const [selectedSort, setSelectedSort] = useState("name");

  const sortByName = useCallback(
    (array: SignUpData[]): SignUpData[] =>
      array.sort((a, b) =>
        allVolunteerData[a.userId].name.localeCompare(
          allVolunteerData[b.userId].name
        )
      ),
    [allVolunteerData]
  );
  const sortByRole = useCallback(
    (array: SignUpData[]): SignUpData[] =>
      array.sort((a, b) => a.acceptedRole.localeCompare(b.acceptedRole)),
    []
  );

  /** Search */
  const [searchString, setSearchString] = useState("");

  const resetSettings = () => {
    setSelectedSort("name");
    setSearchString("");
  };

  /** Tabs for approved and pending volunteers */
  const tabs = [
    {
      key: "volunteers",
      label: `Volunteers (${approvedSignUps.length})`,
      onClick: () => {
        setIsApprovedTab(true);
        resetSettings();
      },
    },
    {
      key: "pending-volunteers",
      label: `Pending (${nonApprovedSignUps.length})`,
      onClick: () => {
        setIsApprovedTab(false);
        resetSettings();
      },
    },
  ];

  useEffect(() => {
    let currentSignUps = isApprovedTab
      ? [...approvedSignUps]
      : [...nonApprovedSignUps];
    currentSignUps = currentSignUps.filter(
      (signUp) =>
        allVolunteerData[signUp.userId]?.name.search(
          new RegExp(searchString, "i")
        ) >= 0
    );

    /** Sort */
    switch (selectedSort) {
      case "name":
        currentSignUps = sortByName(currentSignUps);
        break;
      case "role":
        currentSignUps = isApprovedTab
          ? sortByRole(currentSignUps)
          : currentSignUps;
        break;
      default:
    }

    if (isApprovedTab) setDisplayedApprovedSignUps(currentSignUps);
    else setDisplayedNonApprovedSignUps(currentSignUps);
  }, [
    allVolunteerData,
    approvedSignUps,
    isApprovedTab,
    nonApprovedSignUps,
    searchString,
    selectedSort,
    sortByName,
    sortByRole,
  ]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      flex: isApprovedTab ? 0.35 : 0.2,
      valueGetter: (params: GridValueGetterParams) => {
        const userId = params.getValue(params.id, "userId") as string;
        const volunteer = allVolunteerData[userId];
        return volunteer.name;
      },
    },
    {
      field: "Contact Number",
      headerName: "Contact Number",
      sortable: false,
      flex: 0.25,
      valueGetter: (params: GridValueGetterParams) => {
        const userId = params.getValue(params.id, "userId") as string;
        const volunteer = allVolunteerData[userId];
        return volunteer.mobileNumber;
      },
    },
    {
      field: "role",
      headerName: "Role",
      sortable: isApprovedTab,
      flex: isApprovedTab ? 0.35 : 0.4,
      renderCell: (params: GridCellParams) =>
        (isApprovedTab && signUpIdOfRolesBeingEdited.includes(params.id)) ||
        !isApprovedTab
          ? getRoleSelectMenu(params.row as SignUpData)
          : params.getValue(params.id, "acceptedRole"),
    },
  ];

  if (isApprovedTab) {
    columns.push({
      field: "",
      headerName: "",
      sortable: false,
      flex: 0.05,
      align: "right",
      renderCell: (params: GridCellParams) => {
        const userId = params.getValue(params.id, "userId") as string;
        const volunteer = allVolunteerData[userId];
        const signUp = params.row as SignUpData;
        return getApprovedTabButtons(signUp, volunteer?.name);
      },
    });
  } else {
    columns.push({
      field: "",
      headerName: "",
      sortable: false,
      flex: 0.3,
      renderCell: (params: GridCellParams) => {
        const signUp = params.row as SignUpData;
        return getPendingTabButtons(signUp);
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
                ? displayedApprovedSignUps
                : displayedNonApprovedSignUps
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
