import {
  makeStyles, Grid, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton,
  Button, Popover, FormControl, TablePagination, Select, MenuItem, Badge, InputLabel,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { getVolunteersById } from '@redux/actions/volunteer';
import { getSignUpsUpcomingEvent, updateSignUpInstant } from '@redux/actions/signUp';
import { SignUpData } from '@type/signUp';
import { Tabs } from '@components/common/Tabs';
import { unwrapResult } from '@reduxjs/toolkit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ActionableDialog } from '@components/common/ActionableDialog';
import CloseIcon from '@material-ui/icons/Close';
import { getEvent } from '@redux/actions/event';
import CheckIcon from '@material-ui/icons/Check';
import SearchBar from '@components/common/SearchBar';
import { UpdateSignUpRequest } from '@api/request';

export const rowsPerPage = 10;

const useStyles = makeStyles((theme) => ({
  popUpButton: {
    textTransform: 'none',
    width: '100%',
    textAlign: 'left',
  },
  redCloseButton: {
    width: '55px',
    height: '38px',
    backgroundColor: '#D32A20', // red
    '&:hover': {
      backgroundColor: '#eb3e34', // lighter red
    },
    borderRadius: '5em',
  },
  whiteCancelIcon: {
    color: 'white',
  },
  assignButton: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: '#def024', // lighter green
    },
    borderRadius: '5em',
    color: 'white',
    width: '80%',
  },
  tickButton: {
    width: '55px',
    height: '38px',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: '#def024', // lighter green
    },
    borderRadius: '5em',
  },
  selectRole: {
    minWidth: '100%',
    borderRadius: '10px',
    boxShadow: '0px 2px 4px 1px rgba(0, 0, 0, 0.25)',
  },
  badge: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
  },
}));

const isStatusApproved = (status: string | string[]) => typeof status !== 'string' && status[0] === 'accepted';

const EventVolunteers = ({ eid }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const signUps = useAppSelector((state) => state.signUp);
  const event = useAppSelector((state) => state.event.form);
  const roles = event?.roles;

  const [allVolunteerIds, setAllVolunteerIds] = useState<string[]>([]);
  const [allVolunteerData, setAllVolunteerData] = useState({});
  const [approvedSignUps, setApprovedSignUps] = useState<SignUpData[]>([]);
  const [nonApprovedSignUps, setNonApprovedSignUps] = useState<SignUpData[]>([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [roleVacancies, setRoleVacancies] = useState({});
  const [displayedApprovedSignUps, setDisplayedApprovedSignUps] = useState<SignUpData[]>([]);
  const [displayedNonApprovedSignUps, setDisplayedNonApprovedSignUps] = useState<SignUpData[]>([]);

  useEffect(() => {
    if (eid) {
      dispatch(getEvent(eid));
      dispatch(getSignUpsUpcomingEvent({ id: eid, idType: 'eventId' }));
    }
  }, [eid]);

  useEffect(() => {
    if (signUps && eid) {
      const signUpsData = signUps.data;
      const volunteerIds = Object.values(signUpsData)
        .filter((signUp) => signUp.eventId === eid)
        .map((signUp) => signUp.userId);
      setAllVolunteerIds(volunteerIds);
    }
  }, [signUps]);

  const getVolunteerData = async () => {
    const volunteerData = await dispatch(getVolunteersById({ ids: allVolunteerIds }))
      // @ts-ignore type exists
      .then(unwrapResult)
      .then((result) => result.data);
    return volunteerData;
  };

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
  }, [allVolunteerIds]);

  const getVacanciesForAllRoles = () => {
    const vacancies = {};
    roles?.forEach((role) => {
      const num = role.capacity - role.volunteers.length;
      vacancies[role.name] = num > 0 ? num : 0;
    });
    return vacancies;
  };
  useEffect(() => {
    setRoleVacancies(getVacanciesForAllRoles());
  }, [event, roles]);

  useEffect(() => {
    const signUpData = signUps.data;
    const approved = [];
    const nonApproved = [];
    Object.values(signUpData)
      .filter((signUp) => signUp.eventId === eid)
      .forEach((signUp) => {
        if (isStatusApproved(signUp.status)) {
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
  }, [signUps]);

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
  const [signUpIdOfRolesBeingEdited, setSignUpIdOfRolesBeingEdited] = useState([]);

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
        defaultValue={signUp && isStatusApproved(signUp.status) ? signUp.status[1] : 'Role'}
        value={selectedRoles[signUp._id]}
        onChange={(e) => handleSelectedRoleChange(signUp._id, e)}
      >
        <MenuItem value="" disabled>
          Preferences
        </MenuItem>
        {signUp?.preferences.map((preference, index) => (
          <MenuItem value={preference} disabled={roleVacancies[preference] === 0}>
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

    dispatch(updateSignUpInstant({
      data: { ...signUp, status: ['accepted', selectedRole] },
      id: signUp._id,
      idType: 'signUpId',
    }));
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
      const updatedSignUpIdOfRolesBeingEdited = [...signUpIdOfRolesBeingEdited, signUpId];
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
        <IconButton onClick={(e) => handleClickMoreButton(e, signUp._id)} ref={anchorEl}>
          <MoreVertIcon />
        </IconButton>
        <Popover
          id={signUp._id}
          open={openedPopoverId === signUp._id}
          anchorEl={anchorEl}
          onClose={handleCloseMoreButton}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
        >
          <Grid direction="row">
            <Grid item>
              <ActionableDialog
                open={openRemoveDialog}
                setOpen={() => setOpenRemoveDialog(!openRemoveDialog)}
                content={`Are you sure you want to remove ${volunteerName} as a volunteer?`}
                buttonTitle="Delete"
                buttonOnClick={() => onUpdateSignUp({
                  data: { ...signUp, status: 'pending' },
                  id: signUp._id,
                  idType: 'signUpId',
                })}
                openCloseButtonStyle="popUpButton"
                openCloseButtonTitle="Remove Volunteer from Event"
                recommendedAction="cancel"
              />
            </Grid>
            <Grid item>
              {getEditRoleButton(signUp._id)}
            </Grid>
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
        {signUpIdOfRolesBeingEdited.includes(signUp._id) ? editingButtons : moreButton}
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

    const assignedButton = (
      <Button disabled>
        Assigned
      </Button>
    );

    if (isStatusApproved(signUp.status)) {
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

  /** Pagination */
  const [pageNumber, setPageNumber] = useState(0);

  const handleChangePageNumber = (e, newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  /** Sort */
  const sortFieldsForApprovedTab = [{ label: 'Name', value: 'name' }, { label: 'Role', value: 'role' }];
  const sortFieldsForPendingTab = [{ label: 'Name', value: 'name' }];
  const sortFields = isApprovedTab ? sortFieldsForApprovedTab : sortFieldsForPendingTab;

  const [selectedSort, setSelectedSort] = useState(null);

  const sortByName = (array: SignUpData[]): SignUpData[] => array
    .sort((a, b) => allVolunteerData[a.userId].name.localeCompare(allVolunteerData[b.userId].name));
  const sortByRole = (array: SignUpData[]): SignUpData[] => array
    .sort((a, b) => a.status[1].localeCompare(b.status[1]));

  /** Search */
  const [searchString, setSearchString] = useState('');

  const resetSettings = () => {
    setSelectedSort('');
    setSearchString('');
  };

  /** Tabs for approved and pending volunteers */
  const tabs = [
    {
      key: 'volunteers',
      label: `Volunteers (${approvedSignUps.length})`,
      onClick: () => {
        setIsApprovedTab(true);
        resetSettings();
      },
    },
    {
      key: 'pending-volunteers',
      label: `Pending (${nonApprovedSignUps.length})`,
      onClick: () => {
        setIsApprovedTab(false);
        resetSettings();
      },
    },
  ];

  useEffect(() => {
    let currentSignUps = isApprovedTab ? [...approvedSignUps] : [...nonApprovedSignUps];
    currentSignUps = currentSignUps.filter((signUp) => allVolunteerData[signUp.userId]?.name.search(new RegExp(searchString, 'i')) >= 0);

    /** Sort */
    switch (selectedSort) {
      case 'name':
        currentSignUps = sortByName(currentSignUps);
        break;
      case 'role':
        currentSignUps = isApprovedTab ? sortByRole(currentSignUps) : currentSignUps;
        break;
      default:
    }

    if (isApprovedTab) setDisplayedApprovedSignUps(currentSignUps);
    else setDisplayedNonApprovedSignUps(currentSignUps);
  }, [searchString, selectedSort]);

  /** Get  table body for approved volunteers tab */
  const getApprovedVolunteersTableBody = () => displayedApprovedSignUps.map((signUp) => {
    const volunteer = allVolunteerData[signUp.userId];
    return (
      <TableRow key={signUp._id}>
        <TableCell><b>{volunteer?.name}</b></TableCell>
        <TableCell>{volunteer?.mobileNumber}</TableCell>
        <TableCell>
          {signUpIdOfRolesBeingEdited.includes(signUp._id)
            ? getRoleSelectMenu(signUp)
            : signUp?.status[1]}
        </TableCell>
        <TableCell>{getApprovedTabButtons(signUp, volunteer?.name)}</TableCell>
      </TableRow>
    );
  });

  /** Get  table body for pending volunteers tab */
  const getNonApprovedSignUpsVolunteersTableBody = () => displayedNonApprovedSignUps.map(
    (signUp) => {
      const volunteer = allVolunteerData[signUp.userId];
      return (
        <TableRow key={signUp._id}>
          <TableCell><b>{volunteer?.name}</b></TableCell>
          <TableCell>{volunteer?.mobileNumber}</TableCell>
          <TableCell>{getRoleSelectMenu(signUp)}</TableCell>
          <TableCell>{getPendingTabButtons(signUp)}</TableCell>
        </TableRow>
      );
    },
  );

  const sortMenu = (
    <FormControl fullWidth variant="outlined" size="small" margin="dense">
      <InputLabel>Sort By:</InputLabel>
      <Select
        value={selectedSort}
        onChange={(e) => setSelectedSort(e.target.value)}
      >
        {sortFields.map((field) => <MenuItem value={field.value}>{field.label}</MenuItem>)}
      </Select>
    </FormControl>
  );

  return (
    <>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} md={8}>
          <h2>{event?.name}</h2>
        </Grid>
        <Grid item xs={12} md={8}>
          <Tabs tabs={tabs} clickedOn={1} />
        </Grid>
        <Grid item container xs={12} md={8} alignItems="center" justify="center" spacing={2}>
          <Grid item xs={12} md={9}>
            <SearchBar setFilterFunction={setSearchString} />
          </Grid>
          <Grid item xs={12} md={3}>
            {sortMenu}
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow key={event?.name}>
                  <TableCell width="22%"><b>Name</b></TableCell>
                  <TableCell width="20%"><b>Contact Number</b></TableCell>
                  <TableCell width="33%"><b>Role</b></TableCell>
                  <TableCell width="25%" />
                </TableRow>
              </TableHead>
              <TableBody>
                {isApprovedTab
                  ? getApprovedVolunteersTableBody()
                  : getNonApprovedSignUpsVolunteersTableBody()}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[rowsPerPage]}
            component="div"
            count={isApprovedTab ? approvedSignUps.length : nonApprovedSignUps.length}
            rowsPerPage={rowsPerPage}
            page={pageNumber}
            onChangePage={handleChangePageNumber}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EventVolunteers;
