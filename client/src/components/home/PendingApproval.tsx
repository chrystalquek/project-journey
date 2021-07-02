import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { getPendingSignUps } from "@redux/actions/signUp";
import { getPendingVolunteers } from "@redux/actions/volunteer";

const useStyles = makeStyles((theme) => ({
  shapeCircle: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
    borderRadius: "50%",
    textAlign: "center",
    fontSize: "large",
    color: theme.palette.common.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const PendingApproval: FC<{}> = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  // Only load on initial render to prevent infinite loop
  useEffect(() => {
    dispatch(getPendingSignUps());
    dispatch(getPendingVolunteers());
  }, []);

  const pendingSignUpCount = useAppSelector((state) => state.signUp)
    .pendingSignUps.ids.length;
  const pendingVolunteerCount = useAppSelector(
    (state) => state.pendingVolunteer
  ).pendingVolunteers.ids.length;

  return (
    <Card>
      <CardContent>
        <Grid container direction="row">
          <Grid item xs={10}>
            <Typography variant="h2" style={{ fontWeight: "bold" }}>
              Pending Approvals
            </Typography>
            <Typography>
              {pendingVolunteerCount} pending volunteer approvals
            </Typography>
            <Typography>
              {pendingSignUpCount} pending event approvals
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <div className={classes.shapeCircle}>
              {pendingVolunteerCount + pendingSignUpCount}
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PendingApproval;
