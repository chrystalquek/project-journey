import React, { FC, useCallback, useState } from "react";
import {
  IconButton,
  MenuItem,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  makeStyles,
  FormControl,
  Select,
  Input,
  Button,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { VolunteerType } from "@type/volunteer";
import EditIcon from "@material-ui/icons/Edit";
import { updateVolunteer } from "@redux/actions/user";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  centralize: {
    textAlign: "center",
    justifyContent: "center",
  },
}));

const ChangeVolunteerType: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const profilePageData = useAppSelector((state) => state.profilePage.data);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [volunteerType, setVolunteerType] = useState<VolunteerType>(
    profilePageData.volunteerType
  );

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleChange = useCallback(
    (event) => {
      setVolunteerType(event.target.value || profilePageData.volunteerType);
    },
    [profilePageData]
  );

  const handleSubmit = () => {
    const updatedVolunteerData = { ...profilePageData, volunteerType };
    dispatch(
      updateVolunteer({ _id: profilePageData._id, data: updatedVolunteerData })
    );
    handleCloseDialog();
  };

  return (
    <div>
      <IconButton onClick={handleOpenDialog}>
        <EditIcon fontSize="small" />
      </IconButton>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography className={classes.centralize}>
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
                <MenuItem
                  className={classes.centralize}
                  value={VolunteerType.ADHOC}
                >
                  Ad-hoc Volunteer
                </MenuItem>
                <MenuItem
                  className={classes.centralize}
                  value={VolunteerType.COMMITTED}
                >
                  Committed Volunteer
                </MenuItem>
                <MenuItem
                  className={classes.centralize}
                  value={VolunteerType.ADMIN}
                >
                  Admin
                </MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions className={classes.centralize}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChangeVolunteerType;
