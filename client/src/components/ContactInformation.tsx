import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProfileDivider from '@components/common/ProfileDivider';
import DataRow from '@components/common/DataRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: '20px 20px'
  }
}));

const ContactInformation = ({ user }) => {
  const classes = useStyles()
  
  return (
      <Grid className={classes.grid} container direction="column">
      <Grid item>
        <Typography variant="h4">Contact Information</Typography>
      </Grid>
      <Grid item>
        <ProfileDivider />
      </Grid>
      <DataRow header="Tel. No." data={user.contactNumber} xs1={3} xs2={9} />
      <DataRow header="E-mail" data={user.email} xs1={3} xs2={9} />
      <DataRow header="Lorem" data={user.lorem} xs1={3} xs2={9} />
    </Grid>
  )
}

export default ContactInformation;
