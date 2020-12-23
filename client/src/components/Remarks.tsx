import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProfileDivider from '@components/common/ProfileDivider';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PaddedGrid from '@components/common/PaddedGrid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.grey[100],
    height: '50px',
    padding: '5px 10px',
  },
  grid: {
    padding: '20px 20px'
  },
  save: {
    color: '#FFFFFF'
  },
  discard: {
    color: theme.palette.secondary.main
  }
}));

const CustomTextField = ({ value, onChange, label, show, onSave, onDiscard }) => {
  return (
    <Grid item container direction='column' spacing={1}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          size='small'
          multiline
          variant="filled"
          color='secondary'
          value={value}
          onChange={onChange}
          label={label}
        />
      </Grid>
      <DiscardSaveButtons 
        show={show} 
        onSave={onSave}
        onDiscard={onDiscard}
      />
    </Grid>
  )
}

const DiscardSaveButtons = ({ show, onSave, onDiscard }) => {
  const classes = useStyles()

  return show 
    ? (
      <Grid item container spacing={2}>
        <Grid item>
          <Button 
            variant="contained"
            color="secondary"
            onClick={onSave}
            size='small'
            disableElevation
          >
            <Typography variant='body2' className={classes.save}>
              Save
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button 
            color="secondary"
            onClick={onDiscard}
            size='small'
            disableElevation
          >
            <Typography variant='body2' className={classes.discard}>
              Discard
            </Typography>
          </Button>
        </Grid>
      </Grid>
    )
    : null
}

export default function Remarks({ user }) {
  const classes = useStyles();
  const [volunteerRemarks, setVolunteerRemarks] = useState<string>(user.volunteerRemarks)
  const [adminRemarks, setAdminRemarks] = useState<string>(user.adminRemarks)
  const [volunteerRemarksChanged, setVolunteerRemarksChanged] = useState<boolean>(false);
  const [adminRemarksChanged, setAdminRemarksChanged] = useState<boolean>(false);

  const handleVolunteerRemarks = (event) => {
    setVolunteerRemarks(event.target.value)
    setVolunteerRemarksChanged(event.target.value !== user.volunteerRemarks)
  }

  const handleAdminRemarks = (event) => {
    setAdminRemarks(event.target.value)
    setAdminRemarksChanged(event.target.value !== user.adminRemarks)
  }

  const saveVolunteerRemarks = () => {
    // sync database
    user.volunteerRemarks = volunteerRemarks
    setVolunteerRemarksChanged(false)
  }
  const saveAdminRemarks = () => {
    user.adminRemarks = adminRemarks
    setAdminRemarksChanged(false)
  }

  const discardVolunteerRemarks = () => {
    setVolunteerRemarks(user.volunteerRemarks)
    setVolunteerRemarksChanged(false)
  }
  const discardAdminRemarks = () => {
    setAdminRemarks(user.adminRemarks)
    setAdminRemarksChanged(false)
  }

  return (
    <PaddedGrid>
      <Grid item>
        <Typography variant="h4">Remarks</Typography>
      </Grid>
      <Grid item>
        <ProfileDivider />
      </Grid>
      <Grid item container direction='column' spacing={2}>
        <CustomTextField 
          value={volunteerRemarks}
          onChange={handleVolunteerRemarks}
          label='Notes for Admin'
          show={volunteerRemarksChanged} 
          onSave={saveVolunteerRemarks}
          onDiscard={discardVolunteerRemarks}
        />
        {user.status === 'admin'
          ? (
            <CustomTextField 
              value={adminRemarks}
              onChange={handleAdminRemarks}
              label='Notes on volunteer'
              show={adminRemarksChanged} 
              onSave={saveAdminRemarks}
              onDiscard={discardAdminRemarks}
            />
          )
          : null}
      </Grid>
    </PaddedGrid>
  )
}
