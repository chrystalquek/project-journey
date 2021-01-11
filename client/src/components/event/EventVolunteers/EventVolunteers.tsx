import {
  makeStyles, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Popover,
} from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { EventData } from 'types/event';
import { StoreState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsUpcomingEvent, getEvent } from '@redux/actions/event';
import { getVolunteersById } from '@redux/actions/volunteer';
import { getPendingSignUps, getSignUpsUpcomingEvent, updateSignUp } from '@redux/actions/signUp';
import { SignUpData } from '@type/signUp';
import NavBar from '@components/common/NavBar';
import { Footer } from 'antd/lib/layout/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Tabs } from '@components/common/Tabs';
import { unwrapResult } from '@reduxjs/toolkit';
import { NumberSchema } from 'yup';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ActionableDialog } from '@components/common/ActionableDialog';

const useStyles = makeStyles((theme) => ({
  // popUpButton: {
  //   backgroundColor: theme.palette.primary.main,
  //   width: 40,
  //   height: 40,
  //   borderRadius: '50%',
  //   textAlign: 'center',
  //   fontSize: 'large',
  //   color: 'white',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  popUpButton: {
    textTransform: 'none',
    width: '100%',
  },
}));

const EventVolunteers = ({ eid }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state: StoreState) => state.user);
  const signUps = useSelector((state: StoreState) => state.signUp);
  const event = useSelector((state: StoreState) => state.event.form);

  const [allVolunteerIds, setAllVolunteerIds] = useState([]);
  const [allVolunteerData, setAllVolunteerData] = useState({});
  const [approvedSignUps, setApprovedSignUps] = useState([]);
  const [nonApprovedSignUps, setNonApprovedSignUps] = useState([]);

  useEffect(() => {
    if (eid) {
      dispatch(getEvent(eid));
      dispatch(getSignUpsUpcomingEvent({ id: eid, idType: 'eventId' }));
    }
  }, [eid]);

  useEffect(() => {
    const signUpsData = signUps.data;
    const temp = Object.values(signUpsData).map((signUp) => signUp.user_id); // TODO: to camel
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

  useEffect(() => {
    const signUpData = signUps.data;
    const approved = [];
    const nonApproved = [];
    Object.values(signUpData).forEach((signUp) => {
      if (typeof signUp.status !== 'string') {
        approved.push(signUp);
      } else {
        nonApproved.push(signUp);
      }
    });
    setApprovedSignUps(approved);
    setNonApprovedSignUps(nonApproved);
  }, [signUps]);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  // const [isEditingRole, setIsEditingRole] = useState(false);

  const onUpdateSignUp = ({ data, signUpId }) => {
    dispatch(updateSignUp({ signUpId, data }));
    setOpenRemoveDialog(false);
  };

  const getMoreButton = (signUp: SignUpData, volunteerName: string) => {
    const removeButton = (
      <Button
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
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Popover
          id={signUp.sign_up_id}
          open={open}
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
                  data: { status: 'pending' },
                  signUpId: signUp.sign_up_id,
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

    // const removeVolunteerButton = (
    //   <Button
    //     onClick={() => setOpenRemove(true)}
    //   >
    //     Remove Volunteer From Event
    //   </Button>
    // );
    // const editRoleButton = (
    //   <IconButton
    //     onClick={() => setOpenEdit(true)}
    //   >
    //     Remove Volunteer From Event
    //   </IconButton>
    // );
    // return (
    //   <Grid direction="row">
    //     {removeVolunteerButton}
    //     <ActionableDialog
    //       open={openRemove}
    //       onClose={() => setOpenRemove(false)}
    //       content={`Are you sure you want to remove ${volunteerName} as a volunteer?`}
    //       buttonTitle="Remove Volunteer From Event"
    //       buttonOnClick={() => onUpdateRole(
    //         {
    //           data: { status: 'pending' },
    //           signUpId: signUp.sign_up_id,
    //         },
    //       )}
    //     />
    //     {editRoleButton}
    //     <ActionableDialog
    //       open={openEdit}
    //       onClose={() => setOpenEdit(false)}
    //       content={`Are you sure you want to edit ${volunteerName}'s role?`}
    //       buttonTitle="Edit Role"
    //       buttonOnClick={() => onUpdateRole(
    //         {
    //           data: { status: ['accepted', 'EDITED'] },
    //           signUpId: signUp.sign_up_id,
    //         },
    //       )}
    //     />
    //   </Grid>
  };

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
    const volunteer = allVolunteerData[signUp.user_id];
    return (
      <TableRow key={signUp?.sign_up_id}>
        <TableCell><b>{volunteer?.name}</b></TableCell>
        <TableCell>{volunteer?.mobile_number}</TableCell>
        <TableCell>{signUp?.status[1]}</TableCell>
        <TableCell>{getMoreButton(signUp, volunteer?.name)}</TableCell>
      </TableRow>
    );
  });

  const getNonApprovedSignUpsVolunteersTableBody = () => nonApprovedSignUps.map(
    (signUp) => {
      const volunteer = allVolunteerData[signUp.user_id];
      return (
        <TableRow key={signUp?.sign_up_id}>
          <TableCell><b>{volunteer?.name}</b></TableCell>
          <TableCell>{volunteer?.mobile_number}</TableCell>
          <TableCell>{signUp?.status[1]}</TableCell>
          <TableCell>{getMoreButton(signUp, volunteer?.name)}</TableCell>
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
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Contact Number</b></TableCell>
                  <TableCell><b>Role</b></TableCell>
                  <TableCell />
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
