import React, { FC, useCallback, useRef, useState } from 'react';
import {
  IconButton, Popper, Fade, Paper, MenuList, MenuItem, ClickAwayListener, Dialog, DialogTitle, Typography, DialogContent, DialogActions, makeStyles, FormControl, InputLabel, Select, Input, Button,
} from '@material-ui/core';
import { StoreState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { VOLUNTEER_TYPE } from '@type/volunteer';
import EditIcon from '@material-ui/icons/Edit';
import { updateVolunteer } from '@redux/actions/user';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  centralize: {
    textAlign: 'center',
    justifyContent: 'center',
  },
}));

const ChangeVolunteerStatus = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const profilePageData = useSelector((state: StoreState) => state.profilePage.data);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [volunteerType, setVolunteerType] = useState<VOLUNTEER_TYPE>(profilePageData.volunteerType)

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true);
  }, [openDialog])

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, [openDialog])

  const handleChange = useCallback((event) => {
    setVolunteerType(event.target.value || profilePageData.volunteerType)
  }, [volunteerType])
  
  const handleSubmit = () => {
    const updatedVolunteerData = {...profilePageData, volunteerType:volunteerType}
    dispatch(updateVolunteer({ email: profilePageData.email, updatedVolunteerData: updatedVolunteerData}))
    handleCloseDialog()
  }

  return (
    <div>
      <IconButton onClick={handleOpenDialog}>
        <EditIcon fontSize='small'/>
      </IconButton>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>
          <Typography variant="h2" className={classes.centralize}>
            Change volunteer type to
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.centralize}>
          <form>
            <FormControl className={classes.formControl}>
              <Select
                value={volunteerType}
                onChange={handleChange}
                input={<Input />}
              >
                <MenuItem className={classes.centralize} value={VOLUNTEER_TYPE.ADHOC}>Ad-hoc Volunteer</MenuItem>
                <MenuItem className={classes.centralize} value={VOLUNTEER_TYPE.COMMITED}>Committed Volunteer</MenuItem>
                <MenuItem className={classes.centralize} value={VOLUNTEER_TYPE.ADMIN}>Admin</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions className={classes.centralize}>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  )

}

export default ChangeVolunteerStatus
