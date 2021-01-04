import {
  makeStyles, Grid, Card, CardContent, Typography,
} from '@material-ui/core';
import { StoreState } from '@redux/store';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPendingSignUpsPendingApproval } from '@redux/actions/signUp';
import { getPendingVolunteersPendingApproval } from '@redux/actions/volunteer';

const useStyles = makeStyles((theme) => ({
  shapeCircle: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
    borderRadius: '50%',
    textAlign: 'center',
    fontSize: 'large',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const PendingApproval: FC<{}> = ({ }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  // Only load on initial render to prevent infinite loop
  useEffect(() => {
    dispatch(getPendingSignUpsPendingApproval());
    dispatch(getPendingVolunteersPendingApproval());
  }, []);

  const { pendingSignUpCount } = useSelector((state: StoreState) => state.signUp).pendingApproval;
  const { pendingVolunteerCount } = useSelector((state: StoreState) => state.volunteer).pendingApproval;

  return (
    <Card>
      <CardContent>
        <Grid container direction="row">
          <Grid item xs={10}>
            <Typography variant="h4">Pending Approvals</Typography>
            <Typography>
              {pendingVolunteerCount}
              {' '}
              pending volunteer approvals
            </Typography>
            <Typography>
              {pendingSignUpCount}
              {' '}
              pending event approvals
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <div className={classes.shapeCircle}>{pendingVolunteerCount + pendingSignUpCount}</div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PendingApproval;
