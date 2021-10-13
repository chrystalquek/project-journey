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
import { selectSignUpsByIds } from "@redux/reducers/signUp";
import { selectVolunteersByIds } from "@redux/reducers/volunteer";
import LoadingIndicator from "@components/common/LoadingIndicator";

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
  const isLoading = useAppSelector(
    (state) =>
      state.signUp.status === "pending" || state.volunteer.status === "pending"
  );

  // Only load on initial render to prevent infinite loop
  useEffect(() => {
    dispatch(getPendingSignUps());
    dispatch(getPendingVolunteers());
  }, [dispatch]);

  const pendingSignUps = useAppSelector((state) =>
    selectSignUpsByIds(state, state.signUp.listSignUpIds)
  );
  const pendingVolunteers = useAppSelector((state) =>
    selectVolunteersByIds(state, state.volunteer.pendingVolunteerIds)
  );

  const pendingSignUpCount = pendingSignUps.length;
  const pendingVolunteerCount = pendingVolunteers.length;

  if (isLoading) {
    return <LoadingIndicator />;
  }

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
