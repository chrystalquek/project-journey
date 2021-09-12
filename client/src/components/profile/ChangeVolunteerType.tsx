import React, { FC, useCallback, useState } from "react";
import {
  IconButton,
  MenuItem,
  Typography,
  makeStyles,
  FormControl,
  Select,
  Input,
  Button,
  Box,
} from "@material-ui/core";
import Dialog from "@components/common/feedback/Dialog";
import DialogContent from "@components/common/feedback/DialogContent";
import DialogActions from "@components/common/feedback/DialogActions";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { VolunteerType } from "@type/volunteer";
import EditIcon from "@material-ui/icons/Edit";
import { updateVolunteer } from "@redux/actions/user";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { assert } from "@utils/helpers/typescript";

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
  const [volunteerType, setVolunteerType] = useState<VolunteerType | null>(
    profilePageData?.volunteerType ?? null
  );

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleChange = useCallback(
    (event) => {
      setVolunteerType(event.target.value || profilePageData?.volunteerType);
    },
    [profilePageData]
  );

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    if (volunteerType) {
      assert(
        profilePageData,
        "profilePageData must be present before submitting."
      );

      const updatedVolunteerData = { ...profilePageData, volunteerType };
      dispatch(
        updateVolunteer({
          _id: profilePageData._id,
          data: updatedVolunteerData,
        })
      )
        .then(unwrapResult)
        .catch(() => {
          enqueueSnackbar(`Change volunteer type failed.`, {
            variant: "error",
          });
        });
      handleCloseDialog();
    }
  };

  return (
    <div>
      <IconButton onClick={handleOpenDialog}>
        <EditIcon fontSize="small" />
      </IconButton>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs">
        <DialogContent className={classes.centralize}>
          <Box mb={3}>
            <Typography>Change volunteer type to</Typography>
          </Box>
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
