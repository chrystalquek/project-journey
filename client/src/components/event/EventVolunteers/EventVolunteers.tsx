import {
  makeStyles, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Popover, FormControl, InputLabel, Select, MenuItem, Badge,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { StoreState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getVolunteersById } from '@redux/actions/volunteer';
import { getSignUpsUpcomingEvent, updateSignUp } from '@redux/actions/signUp';
import { SignUpData } from '@type/signUp';
import { Footer } from 'antd/lib/layout/layout';

import { Tabs } from '@components/common/Tabs';
import { unwrapResult } from '@reduxjs/toolkit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ActionableDialog } from '@components/common/ActionableDialog';
import CloseIcon from '@material-ui/icons/Close';
import { getEvent } from '@redux/actions/event';

const useStyles = makeStyles((theme) => ({
  popUpButton: {
    textTransform: 'none',
    width: '100%',
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
  const dispatch = useDispatch();

  const signUps = useSelector((state: StoreState) => state.signUp);
  const event = useSelector((state: StoreState) => state.event.form);
  const roles = event?.roles;

  const [allVolunteerIds, setAllVolunteerIds] = useState([]);
  const [allVolunteerData, setAllVolunteerData] = useState({});
  const [approvedSignUps, setApprovedSignUps] = useState([]);
  const [nonApprovedSignUps, setNonApprovedSignUps] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [roleVacancies, setRoleVacancies] = useState({});

  useEffect(() => {
    if (eid) {
      dispatch(getEvent(eid));
      dispatch(getSignUpsUpcomingEvent({ id: eid, idType: 'eventId' }));
    }
  }, [eid]);

  useEffect(() => {
    const signUpsData = signUps.data;
    const temp = Object.values(signUpsData).map((signUp) => signUp.userId);
    setAllVolunteerIds(temp);
  }, [signUps]);

  const getVolunteerData = async () => {
    const volunteerData = await dispatch(getVolunteersById(allVolunteerIds))
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
  }, [signUps, allVolunteerIds]);

  const getVacanciesForAllRoles = () => {
    const vacancies = {};
    roles?.forEach((role) => { vacancies[role.name] = role.capacity - role.volunteers.length; });
    return vacancies;
  };
  useEffect(() => {
    setRoleVacancies(getVacanciesForAllRoles());
  }, [event, roles]);

  useEffect(() => {
    const signUpData = signUps.data;
    const approved = [];
    const nonApproved = [];
    Object.values(signUpData).forEach((signUp) => {
      if (isStatusApproved(signUp.status)) {
        approved.push(signUp);
      } else {
        nonApproved.push(signUp);
      }
    });
    dispatch(getEvent(eid));
    setApprovedSignUps(approved);
    setNonApprovedSignUps(nonApproved);
  }, [signUps]);

  const [anchorEl, setAnchorEl] = useState(null);

  const [openedPopoverId, setOpenedPopoverId] = useState(null);

  const handleClick = (event, popoverId) => {
    setOpenedPopoverId(popoverId);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpenedPopoverId(null);
    setAnchorEl(null);
  };

  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  // const [isEditingRole, setIsEditingRole] = useState(false);

  const onUpdateSignUp = ({ request, query }) => {
    dispatch(updateSignUp({ request, query }));
    setOpenRemoveDialog(false);
  };

  const getMoreButton = (signUp: SignUpData, volunteerName: string) => {
    const removeButton = (
      <Button
        variant="contained"
        className={classes.popUpButton}
        onClick={() => {
          setOpenRemoveDialog(true);
        }}
      >
        Remove Volunteer from Event
      </Button>
    );

    // const editRoleButton = (
    //   <Button className={classes.popUpButton} onClick={() => setIsEditingRole(true)}>
    //     Edit Role
    //   </Button>
    // );

    const moreButton = (
      <div>
        <IconButton onClick={(e) => handleClick(e, signUp.signUpId)}>
          <MoreVertIcon />
        </IconButton>
        <Popover
          id={signUp.signUpId}
          open={openedPopoverId === signUp.signUpId}
          anchorEl={anchorEl}
          onClose={handleClose}
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
              {removeButton}
              <ActionableDialog
                open={openRemoveDialog}
                onClose={() => setOpenRemoveDialog(false)}
                content={`Are you sure you want to remove ${volunteerName} as a volunteer?`}
                buttonTitle="Remove"
                buttonOnClick={() => onUpdateSignUp({
                  request: { ...signUp, status: 'pending' },
                  query: {
                    // @ts-ignore TODO: snake -> camel
                    id: signUp.signUpId,
                    idType: 'signUpId',
                  },
                })}
              />
            </Grid>
            {/* <Grid item>
              {editRoleButton}
            </Grid> */}
          </Grid>
        </Popover>
      </div>

    );

    return moreButton;
  };

  const onAssignRole = (signUp) => {
    const selectedRole = selectedRoles[signUp.signUpId];

    dispatch(updateSignUp({
      request: { ...signUp, status: ['accepted', selectedRole] },
      query: {
        id: signUp.signUpId,
        idType: 'signUpId',
      },
    }));
  };

  const getPendingTabButtons = (signUp: SignUpData) => {
    const assignButton = (
      <Button
        className={classes.assignButton}
        onClick={() => onAssignRole(signUp)}
        disabled={!selectedRoles[signUp.signUpId]}
      >
        Assign
      </Button>
    );

    const closeButton = (
      <IconButton className={classes.redCloseButton}>
        <CloseIcon className={classes.whiteCancelIcon} />
      </IconButton>
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
        <Grid item xs={8}>
          {assignButton}
        </Grid>
        <Grid item xs={4}>
          {closeButton}
        </Grid>
      </Grid>
    );
  };

  const handleSelectedRoleChange = (signUpId, event) => {
    setSelectedRoles({ ...selectedRoles, [signUpId]: event.target.value });
  };

  const getRoleSelectMenu = (signUp) => (
    <FormControl variant="outlined" className={classes.selectRole}>
      <Select
        defaultValue=""
        value={selectedRoles[signUp.signUpId]}
        onChange={(e) => handleSelectedRoleChange(signUp.signUpId, e)}
      >
        <MenuItem value="" disabled>
          Preferences
        </MenuItem>
        {signUp?.preferences.map((preference, index) => (
          <MenuItem value={preference}>
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

  const [isApprovedTab, setIsApprovedTab] = useState(true);

  const tabs = [
    {
      key: 'volunteers',
      label: `Volunteers (${approvedSignUps.length})`,
      onClick: () => setIsApprovedTab(true),
    },
    {
      ley: 'pending-volunteers',
      label: `Pending (${nonApprovedSignUps.length})`,
      onClick: () => setIsApprovedTab(false),
    },
  ];

  const getApprovedVolunteersTableBody = () => approvedSignUps.map((signUp) => {
    const volunteer = allVolunteerData[signUp.userId];
    return (
      <TableRow key={signUp.signUpId}>
        <TableCell><b>{volunteer?.name}</b></TableCell>
        <TableCell>{volunteer?.mobileNumber}</TableCell>
        <TableCell>{signUp?.status[1]}</TableCell>
        <TableCell>{getMoreButton(signUp, volunteer?.name)}</TableCell>
      </TableRow>
    );
  });

  const getNonApprovedSignUpsVolunteersTableBody = () => nonApprovedSignUps.map(
    (signUp) => {
      const volunteer = allVolunteerData[signUp.userId];
      return (
        <TableRow key={signUp.signUpId}>
          <TableCell><b>{volunteer?.name}</b></TableCell>
          <TableCell>{volunteer?.mobileNumber}</TableCell>
          <TableCell>{getRoleSelectMenu(signUp)}</TableCell>
          <TableCell>{getPendingTabButtons(signUp)}</TableCell>
        </TableRow>
      );
    },
  );

  return (
    <>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <Tabs tabs={tabs} clickedOn={1} />
          <h1>{event?.name}</h1>
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
                { isApprovedTab
                  ? getApprovedVolunteersTableBody()
                  : getNonApprovedSignUpsVolunteersTableBody()}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Footer />

    </>
  );
};

export default EventVolunteers;
